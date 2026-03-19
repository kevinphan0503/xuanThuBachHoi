import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizGame.css';
import { apiFetch } from '../config/api';

const QuizGame = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [lives, setLives] = useState(3);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [timeLeft, setTimeLeft] = useState(30);
    const [totalTimeSpent, setTotalTimeSpent] = useState(0);
    const [isSavingResult, setIsSavingResult] = useState(false);
    const [sessionUser, setSessionUser] = useState(null);
    const [isCheckingSession, setIsCheckingSession] = useState(true);
    const [guestName, setGuestName] = useState('');
    const [selectedQuestionCount, setSelectedQuestionCount] = useState(40);
    const [customQuestionCountInput, setCustomQuestionCountInput] = useState('10');
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [isRevealingAnswer, setIsRevealingAnswer] = useState(false);
    const [gameMode, setGameMode] = useState(null);
    const [boardgameStep, setBoardgameStep] = useState('choose-difficulty');
    const [boardgameDifficulty, setBoardgameDifficulty] = useState('');
    const [boardgameQuestion, setBoardgameQuestion] = useState(null);
    const [boardgameMessage, setBoardgameMessage] = useState('');
    const [isBoardgameLoading, setIsBoardgameLoading] = useState(false);
    const [boardgameScore, setBoardgameScore] = useState(0);
    const [boardgameAnsweredCount, setBoardgameAnsweredCount] = useState(0);
    const [boardgameCorrectCount, setBoardgameCorrectCount] = useState(0);
    const [boardgameTotalTimeSpent, setBoardgameTotalTimeSpent] = useState(0);
    const [isSavingBoardgameResult, setIsSavingBoardgameResult] = useState(false);

    const startTimeRef = useRef(null);
    const hasSavedAttemptRef = useRef(false);
    const answerTimeoutRef = useRef(null);
    const boardgameStartTimeRef = useRef(null);
    const hasSavedBoardgameAttemptRef = useRef(false);

    const MAX_QUESTIONS = 40;
    const MIN_QUESTIONS = 5;
    const MAX_LIVES = 3;
    const QUESTION_TIME_LIMIT = 30;
    const ANSWER_REVEAL_DELAY_MS = 1200;

    useEffect(() => {
        let mounted = true;
        const fetchSession = async () => {
            try {
                const data = await apiFetch('/api/session');
                if (!mounted) return;
                if (data?.loggedIn && data?.user) {
                    setSessionUser(data.user);
                } else {
                    setSessionUser(null);
                }
            } catch {
                if (!mounted) return;
                setSessionUser(null);
            } finally {
                if (mounted) {
                    setIsCheckingSession(false);
                }
            }
        };

        fetchSession();
        return () => {
            mounted = false;
        };
    }, []);

    const shuffleArray = (items) => {
        const arr = [...items];
        for (let i = arr.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    const normalizeQuestions = (items) => {
        if (!Array.isArray(items)) return [];

        return items
            .map((q) => ({
                ...q,
                answers: Array.isArray(q.answers) ? q.answers : [],
            }))
            .filter((q) => q.content && q.answers.length >= 2);
    };

    const getQuestionPoints = (question) => {
        const points = Number(question?.points_per_question);
        if (Number.isFinite(points) && points > 0) return points;

        const difficulty = String(question?.difficulty || '').toLowerCase();
        if (difficulty === 'hard') return 30;
        if (difficulty === 'medium') return 20;
        return 10;
    };

    const formatDifficultyLabel = (difficulty) => {
        const level = String(difficulty || '').toUpperCase();
        if (level === 'HARD') return 'Khó';
        if (level === 'MEDIUM') return 'Trung bình';
        return 'Dễ';
    };

    const loadQuestions = async (questionCount) => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const safeCount = Math.max(MIN_QUESTIONS, Math.min(MAX_QUESTIONS, Number(questionCount) || MAX_QUESTIONS));
            const data = await apiFetch(`/api/quiz/questions?limit=${safeCount}`);
            const selected = normalizeQuestions(data);

            if (selected.length === 0) {
                setErrorMessage('Chưa có dữ liệu câu hỏi. Vui lòng thử lại sau.');
            }

            setQuestions(selected);
            return selected;
        } catch (error) {
            console.error('Error fetching questions:', error);
            setQuestions([]);
            setErrorMessage('Không tải được bộ câu hỏi. Vui lòng kiểm tra server và thử lại.');
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    const loadRandomQuestionByDifficulty = async (difficulty) => {
        setIsBoardgameLoading(true);
        setErrorMessage('');
        setBoardgameMessage('');

        try {
            const difficultyParam = encodeURIComponent(String(difficulty || '').toUpperCase());
            const data = await apiFetch(`/api/quiz/questions?difficulty=${difficultyParam}&limit=1`);
            const normalized = normalizeQuestions(data);

            if (normalized.length === 0) {
                setBoardgameQuestion(null);
                setErrorMessage('Không có câu hỏi ở mức độ này. Vui lòng chọn mức độ khác.');
                setBoardgameStep('choose-difficulty');
                return;
            }

            setBoardgameQuestion(normalized[0]);
            setBoardgameStep('question');
        } catch (error) {
            console.error('Error loading boardgame question:', error);
            setBoardgameQuestion(null);
            setErrorMessage('Không tải được câu hỏi BoardGame. Vui lòng thử lại.');
            setBoardgameStep('choose-difficulty');
        } finally {
            setIsBoardgameLoading(false);
        }
    };

    const saveAttempt = async (finalScore, finalTimeSpent) => {
        if (hasSavedAttemptRef.current) return;
        hasSavedAttemptRef.current = true;

        setIsSavingResult(true);
        try {
            await apiFetch('/api/quiz/attempts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    score: finalScore,
                    time_spent_seconds: finalTimeSpent,
                    display_name: sessionUser ? undefined : guestName.trim(),
                }),
            });
        } catch (error) {
            console.error('Error saving quiz attempt:', error);
        } finally {
            setIsSavingResult(false);
        }
    };

    const finishGame = (finalScore) => {
        const startedAt = startTimeRef.current;
        const elapsedSeconds = startedAt
            ? Math.max(0, Math.floor((Date.now() - startedAt) / 1000))
            : 0;

        setTotalTimeSpent(elapsedSeconds);
        setShowScore(true);
        saveAttempt(finalScore, elapsedSeconds);
    };

    const saveBoardgameAttempt = async (finalScore, finalTimeSpent) => {
        if (hasSavedBoardgameAttemptRef.current) return;
        hasSavedBoardgameAttemptRef.current = true;

        setIsSavingBoardgameResult(true);
        try {
            await apiFetch('/api/quiz/attempts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    score: finalScore,
                    time_spent_seconds: finalTimeSpent,
                    display_name: sessionUser ? undefined : guestName.trim(),
                }),
            });
        } catch (error) {
            console.error('Error saving boardgame attempt:', error);
        } finally {
            setIsSavingBoardgameResult(false);
        }
    };

    const applyAnswerResult = (isCorrect) => {
        if (!questions[currentQuestionIndex]) return;

        let nextScore = score;

        if (isCorrect) {
            nextScore = score + getQuestionPoints(questions[currentQuestionIndex]);
            setScore(nextScore);
        } else {
            const remainingLives = lives - 1;
            setLives(remainingLives);
            if (remainingLives <= 0) {
                finishGame(nextScore);
                return;
            }
        }

        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < questions.length && nextQuestion < MAX_QUESTIONS) {
            setCurrentQuestionIndex(nextQuestion);
        } else {
            finishGame(nextScore);
        }
    };

    const handleAnswerClick = (answer, index = null) => {
        if (!questions[currentQuestionIndex] || isRevealingAnswer) return;

        setSelectedAnswerIndex(index);
        setIsRevealingAnswer(true);

        if (answerTimeoutRef.current) {
            clearTimeout(answerTimeoutRef.current);
        }

        answerTimeoutRef.current = setTimeout(() => {
            applyAnswerResult(Boolean(answer?.is_correct));
            setSelectedAnswerIndex(null);
            setIsRevealingAnswer(false);
            answerTimeoutRef.current = null;
        }, ANSWER_REVEAL_DELAY_MS);
    };

    const startGame = async (questionCount = MAX_QUESTIONS) => {
        if (!sessionUser && !guestName.trim()) {
            setErrorMessage('Vui lòng nhập tên trước khi bắt đầu chơi.');
            return;
        }

        const safeCount = Math.max(MIN_QUESTIONS, Math.min(MAX_QUESTIONS, Number(questionCount) || MAX_QUESTIONS));
        setGameMode('quiz');
        setSelectedQuestionCount(safeCount);
        setGameStarted(true);
        setCurrentQuestionIndex(0);
        setScore(0);
        setLives(MAX_LIVES);
        setShowScore(false);
        setQuestions([]);
        setTimeLeft(QUESTION_TIME_LIMIT);
        setTotalTimeSpent(0);
        setErrorMessage('');
        setSelectedAnswerIndex(null);
        setIsRevealingAnswer(false);
        hasSavedAttemptRef.current = false;
        startTimeRef.current = null;

        if (answerTimeoutRef.current) {
            clearTimeout(answerTimeoutRef.current);
            answerTimeoutRef.current = null;
        }

        const loadedQuestions = await loadQuestions(safeCount);
        if (loadedQuestions.length > 0) {
            startTimeRef.current = Date.now();
        }
    };

    const handleCustomPlay = () => {
        const parsed = Number(customQuestionCountInput);
        if (!Number.isFinite(parsed) || parsed < MIN_QUESTIONS) {
            setErrorMessage(`Số câu hỏi tối thiểu là ${MIN_QUESTIONS}.`);
            return;
        }
        startGame(parsed);
    };

    const startBoardGame = () => {
        if (!sessionUser && !guestName.trim()) {
            setErrorMessage('Vui lòng nhập tên trước khi bắt đầu chơi.');
            return;
        }

        setErrorMessage('');
        setGameMode('boardgame');
        setGameStarted(false);
        setShowScore(false);
        setBoardgameStep('choose-difficulty');
        setBoardgameDifficulty('');
        setBoardgameQuestion(null);
        setBoardgameMessage('');
        setBoardgameScore(0);
        setBoardgameAnsweredCount(0);
        setBoardgameCorrectCount(0);
        setBoardgameTotalTimeSpent(0);
        setIsSavingBoardgameResult(false);
        boardgameStartTimeRef.current = Date.now();
        hasSavedBoardgameAttemptRef.current = false;
    };

    const handleChooseBoardgameDifficulty = async (difficulty) => {
        setBoardgameDifficulty(difficulty);
        await loadRandomQuestionByDifficulty(difficulty);
    };

    const handleBoardgameAnswer = (isCorrect) => {
        setBoardgameAnsweredCount((prev) => prev + 1);

        if (isCorrect) {
            const pointsEarned = getQuestionPoints(boardgameQuestion);
            setBoardgameScore((prev) => prev + pointsEarned);
            setBoardgameCorrectCount((prev) => prev + 1);
            setBoardgameMessage(`Chúc mừng bạn đã trả lời đúng! +${pointsEarned} điểm.`);
        } else {
            setBoardgameMessage('Tiếc quá, bạn đã trả lời sai mất rồi.');
        }
        setBoardgameStep('result');
    };

    const finishBoardgameSession = () => {
        const startedAt = boardgameStartTimeRef.current;
        const elapsedSeconds = startedAt
            ? Math.max(0, Math.floor((Date.now() - startedAt) / 1000))
            : 0;

        setBoardgameTotalTimeSpent(elapsedSeconds);
        setBoardgameStep('summary');
        saveBoardgameAttempt(boardgameScore, elapsedSeconds);
    };

    const continueBoardgameSameDifficulty = async () => {
        if (!boardgameDifficulty) return;
        await loadRandomQuestionByDifficulty(boardgameDifficulty);
    };

    const resetToQuizHome = () => {
        setGameMode(null);
        setGameStarted(false);
        setShowScore(false);
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setScore(0);
        setLives(MAX_LIVES);
        setTimeLeft(QUESTION_TIME_LIMIT);
        setTotalTimeSpent(0);
        setIsSavingResult(false);
        setSelectedAnswerIndex(null);
        setIsRevealingAnswer(false);
        setBoardgameDifficulty('');
        setBoardgameQuestion(null);
        setBoardgameMessage('');
        setBoardgameScore(0);
        setBoardgameAnsweredCount(0);
        setBoardgameCorrectCount(0);
        setBoardgameTotalTimeSpent(0);
        setIsSavingBoardgameResult(false);

        boardgameStartTimeRef.current = null;
        hasSavedBoardgameAttemptRef.current = false;

        if (answerTimeoutRef.current) {
            clearTimeout(answerTimeoutRef.current);
            answerTimeoutRef.current = null;
        }
    };

    useEffect(() => {
        if (!gameStarted || isLoading || showScore || questions.length === 0 || isRevealingAnswer) return undefined;
        setTimeLeft(QUESTION_TIME_LIMIT);
        return undefined;
    }, [currentQuestionIndex, gameStarted, isLoading, showScore, questions.length, isRevealingAnswer]);

    useEffect(() => {
        if (!gameStarted || isLoading || showScore || questions.length === 0 || isRevealingAnswer) return undefined;
        if (timeLeft <= 0) return undefined;

        const timer = setTimeout(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, gameStarted, isLoading, showScore, questions.length, isRevealingAnswer]);

    useEffect(() => {
        if (!gameStarted || isLoading || showScore || questions.length === 0 || isRevealingAnswer) return;
        if (timeLeft === 0) {
            handleAnswerClick({ is_correct: false }, null);
        }
    }, [timeLeft, gameStarted, isLoading, showScore, questions.length, isRevealingAnswer]);

    useEffect(() => {
        return () => {
            if (answerTimeoutRef.current) {
                clearTimeout(answerTimeoutRef.current);
            }
        };
    }, []);

    const currentQuestion = questions[currentQuestionIndex];
    const currentQuestionPoints = getQuestionPoints(currentQuestion);
    const currentQuestionNumber = currentQuestionIndex + 1;
    const totalQuestionCount = Math.min(questions.length, selectedQuestionCount);
    const quizProgressPercent = totalQuestionCount > 0
        ? Math.min(100, Math.max(0, (currentQuestionNumber / totalQuestionCount) * 100))
        : 0;

    const getAnswerClassName = (answer, index) => {
        let className = 'answer-option';
        if (!isRevealingAnswer) return className;
        if (answer?.is_correct) {
            className += ' answer-correct';
            return className;
        }
        if (selectedAnswerIndex === index) {
            className += ' answer-wrong';
            return className;
        }
        return className;
    };

    const canStartAsGuestOrUser = Boolean(sessionUser || guestName.trim());
    const parsedCustomCount = Number(customQuestionCountInput);
    const isCustomCountValid = Number.isFinite(parsedCustomCount)
        && parsedCustomCount >= MIN_QUESTIONS
        && parsedCustomCount <= MAX_QUESTIONS;
    const canStartCustomQuiz = canStartAsGuestOrUser && isCustomCountValid;
    const quickQuestionOptions = [10, 20, 30, 40];
    const isBoardgameCorrect = String(boardgameMessage || '').toLowerCase().includes('đúng');

    return (
        <div className="quiz-game">
            {gameMode === null ? (
                <div className="start-panel quiz-start-panel">
                    {isCheckingSession ? (
                        <div className="quiz-status">Đang kiểm tra phiên đăng nhập...</div>
                    ) : (
                        <>
                            <div className="quiz-start-header">
                                <div className="start-title">Sẵn sàng thử thách Quiz?</div>
                                <p className="start-subtitle">Chọn chế độ và số lượng câu hỏi để bắt đầu hành trình khám phá lễ hội.</p>
                            </div>

                            {sessionUser ? (
                                <div className="player-label quiz-start-player">Người chơi: {sessionUser.username}</div>
                            ) : (
                                <div className="guest-name-wrap quiz-start-field">
                                    <label className="guest-name-label" htmlFor="guestName">Nhập tên người chơi</label>
                                    <input
                                        id="guestName"
                                        className="guest-name-input"
                                        value={guestName}
                                        onChange={(e) => setGuestName(e.target.value)}
                                        maxLength={100}
                                        placeholder="Ví dụ: Nguyễn Văn A"
                                    />
                                </div>
                            )}

                            <div className="custom-count-wrap quiz-start-field">
                                <label htmlFor="questionCount" className="guest-name-label">Số lượng câu hỏi</label>
                                <div className="quiz-count-layout">
                                    <div className="quiz-count-quick">
                                        {quickQuestionOptions.map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                className={`quiz-count-chip ${Number(customQuestionCountInput) === option ? 'active' : ''}`}
                                                onClick={() => setCustomQuestionCountInput(String(option))}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="quiz-count-manual">
                                        <span className="quiz-count-note">Tùy chọn thủ công (5 - 40)</span>
                                        <input
                                            id="questionCount"
                                            type="number"
                                            min={MIN_QUESTIONS}
                                            max={MAX_QUESTIONS}
                                            value={customQuestionCountInput}
                                            onChange={(e) => setCustomQuestionCountInput(e.target.value)}
                                            className="guest-name-input quiz-count-input"
                                            placeholder="Nhập số câu mong muốn..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="start-actions quiz-start-actions">
                                <button
                                    onClick={() => startGame(MAX_QUESTIONS)}
                                    className="start-button quiz-start-main-btn"
                                    disabled={!canStartAsGuestOrUser}
                                >
                                    Chơi ngay (40 câu)
                                </button>
                                <button
                                    onClick={handleCustomPlay}
                                    className="start-button start-button-secondary quiz-start-custom-btn"
                                    disabled={!canStartCustomQuiz}
                                >
                                    Bắt đầu theo số câu đã nhập
                                </button>
                                <button
                                    onClick={startBoardGame}
                                    className="start-button boardgame-entry-button quiz-start-boardgame-btn"
                                    disabled={!canStartAsGuestOrUser}
                                >
                                    Tôi đang chơi BoardGame
                                </button>
                            </div>

                            {errorMessage && <div className="quiz-status quiz-error">{errorMessage}</div>}
                        </>
                    )}
                </div>
            ) : gameMode === 'boardgame' ? (
                <div className="score-panel boardgame-panel">
                    <div className="score-section boardgame-title">Chế Độ BoardGame</div>
                    {errorMessage && <div className="quiz-status quiz-error">{errorMessage}</div>}

                    {boardgameStep === 'choose-difficulty' && (
                        <div className="boardgame-choose-panel">
                            <div className="boardgame-description">Chọn mức độ để bắt đầu lượt hỏi</div>
                            <div className="boardgame-difficulty-grid">
                                <button
                                    className="start-button boardgame-difficulty-button boardgame-easy"
                                    onClick={() => handleChooseBoardgameDifficulty('EASY')}
                                    disabled={isBoardgameLoading}
                                >
                                    Dễ
                                </button>
                                <button
                                    className="start-button boardgame-difficulty-button boardgame-medium"
                                    onClick={() => handleChooseBoardgameDifficulty('MEDIUM')}
                                    disabled={isBoardgameLoading}
                                >
                                    Trung bình
                                </button>
                                <button
                                    className="start-button boardgame-difficulty-button boardgame-hard"
                                    onClick={() => handleChooseBoardgameDifficulty('HARD')}
                                    disabled={isBoardgameLoading}
                                >
                                    Khó
                                </button>
                            </div>
                            <div className="boardgame-footer-action">
                                <button type="button" className="quiz-back-link" onClick={resetToQuizHome}>
                                    ← Quay lại
                                </button>
                            </div>
                        </div>
                    )}

                    {isBoardgameLoading && <div className="quiz-status">Đang tải câu hỏi...</div>}

                    {boardgameStep === 'question' && boardgameQuestion && !isBoardgameLoading && (
                        <div className="quiz-play-layout">
                            <div className="quiz-play-head">
                                <div className="question-count">
                                    <span>BoardGame</span>
                                </div>
                                <div className="question-meta">
                                    Lượt hỏi (ID {boardgameQuestion.festival_id || 'N/A'}): {boardgameQuestion.festival_name || 'Không rõ'} | Độ khó: {formatDifficultyLabel(boardgameQuestion.difficulty)}
                                </div>
                            </div>

                            <div className="quiz-stats-row">
                                <div className="quiz-stats">Điểm BoardGame hiện tại: {boardgameScore}</div>
                                <div className="quiz-stats">Đã trả lời: {boardgameAnsweredCount}</div>
                            </div>

                            <div className="quiz-progress-track" aria-hidden="true">
                                <div className="quiz-progress-fill" style={{ width: '100%' }} />
                            </div>

                            <div className="question-section">
                                <div className="question-text">{boardgameQuestion.content}</div>
                                <div className="question-divider" />
                            </div>

                            <div className="answer-section">
                                {boardgameQuestion.answers.map((answer, index) => (
                                    <button
                                        key={`${boardgameQuestion.question_id}-${index}`}
                                        type="button"
                                        className="answer-option"
                                        onClick={() => handleBoardgameAnswer(Boolean(answer.is_correct))}
                                    >
                                        <span className="answer-label">{String.fromCharCode(65 + index)}.</span>
                                        <span className="answer-content">{answer.content}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="quiz-bottom-actions">
                                <button type="button" className="quiz-back-link" onClick={resetToQuizHome}>
                                    ← Quay lại
                                </button>
                                <button
                                    type="button"
                                    className="quiz-next-button"
                                    onClick={() => setBoardgameStep('choose-difficulty')}
                                >
                                    Đổi mức độ →
                                </button>
                            </div>
                        </div>
                    )}

                    {boardgameStep === 'result' && (
                        <div className="boardgame-result-panel">

                            <div className={`quiz-status boardgame-result-message ${isBoardgameCorrect ? 'success' : 'fail'}`}>
                                {boardgameMessage}
                            </div>
                            <div className="result-actions boardgame-result-actions">
                                <button
                                    className="start-button boardgame-result-continue"
                                    onClick={continueBoardgameSameDifficulty}
                                >
                                    Tiếp tục mức độ này
                                </button>
                                <button
                                    className="start-button boardgame-result-change"
                                    onClick={() => setBoardgameStep('choose-difficulty')}
                                >
                                    Chọn lại mức độ
                                </button>
                                <button
                                    className="start-button"
                                    onClick={finishBoardgameSession}
                                >
                                    Kết thúc
                                </button>
                            </div>
                            <div className="boardgame-result-back-wrap">
                                <button type="button" className="quiz-back-link" onClick={resetToQuizHome}>
                                    ← Quay lại
                                </button>
                            </div>
                        </div>
                    )}

                    {boardgameStep === 'summary' && (
                        <div className="score-panel quiz-result-panel">
                            <div className="quiz-result-header">
                                <div className="quiz-result-badge">Kết quả BoardGame</div>
                                <div className="score-section quiz-result-score">
                                    Bạn đã ghi được <span>{boardgameScore}</span> điểm!
                                </div>
                                <div className="result-extra quiz-result-time">Tổng thời gian: {boardgameTotalTimeSpent} giây</div>
                                {isSavingBoardgameResult && <div className="result-extra quiz-result-saving">Đang lưu kết quả...</div>}
                            </div>

                            <div className="quiz-result-metrics">
                                <div className="quiz-result-metric-card">
                                    <div className="quiz-result-metric-label">Số câu đã trả lời</div>
                                    <div className="quiz-result-metric-value">{boardgameAnsweredCount}</div>
                                </div>
                                <div className="quiz-result-metric-card">
                                    <div className="quiz-result-metric-label">Số câu đúng</div>
                                    <div className="quiz-result-metric-value">{boardgameCorrectCount}</div>
                                </div>
                                <div className="quiz-result-metric-card">
                                    <div className="quiz-result-metric-label">Tổng điểm</div>
                                    <div className="quiz-result-metric-value">{boardgameScore}</div>
                                </div>
                            </div>

                            <div className="result-actions quiz-result-actions">
                                <button className="start-button" onClick={startBoardGame}>Chơi lại BoardGame</button>
                                <button className="start-button start-button-secondary" onClick={() => navigate('/leaderboard')}>Bảng xếp hạng</button>
                            </div>

                            <div className="boardgame-result-back-wrap">
                                <button type="button" className="quiz-back-link" onClick={resetToQuizHome}>
                                    ← Quay lại
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : isLoading ? (
                <div className="quiz-status">Đang tải câu hỏi...</div>
            ) : errorMessage ? (
                <div className="quiz-status quiz-error">{errorMessage}</div>
            ) : showScore ? (
                <div className="score-panel quiz-result-panel">
                    <button type="button" className="quiz-back-link" onClick={resetToQuizHome}>
                        ← Quay lại
                    </button>
                    <div className="quiz-result-header">
                        <div className="quiz-result-badge">Kết quả lượt chơi</div>
                        <div className="score-section quiz-result-score">
                            Bạn đã ghi được <span>{score}</span> điểm!
                        </div>
                        <div className="result-extra quiz-result-time">Tổng thời gian: {totalTimeSpent} giây</div>
                        {isSavingResult && <div className="result-extra quiz-result-saving">Đang lưu kết quả...</div>}
                    </div>

                    <div className="quiz-result-metrics">
                        <div className="quiz-result-metric-card">
                            <div className="quiz-result-metric-label">Số câu đã chọn</div>
                            <div className="quiz-result-metric-value">{selectedQuestionCount}</div>
                        </div>
                        <div className="quiz-result-metric-card">
                            <div className="quiz-result-metric-label">Tổng điểm</div>
                            <div className="quiz-result-metric-value">{score}</div>
                        </div>
                        <div className="quiz-result-metric-card">
                            <div className="quiz-result-metric-label">Thời gian</div>
                            <div className="quiz-result-metric-value">{totalTimeSpent}s</div>
                        </div>
                    </div>

                    <div className="result-actions quiz-result-actions">


                        <button className="start-button" onClick={() => startGame(selectedQuestionCount)}>Chơi lại</button>
                        <button className="start-button start-button-secondary" onClick={() => navigate('/leaderboard')}>Bảng xếp hạng</button>
                    </div>
                </div>
            ) : (
                questions.length > 0 ? (
                    <div className="quiz-play-layout">
                        <div className="quiz-play-head">
                            <div className="question-count">
                                <span>Câu hỏi {currentQuestionNumber}</span> / {totalQuestionCount}
                            </div>
                            <div className="question-meta">
                                Chủ đề: {currentQuestion?.festival_name || 'Không rõ'} | Độ khó: {formatDifficultyLabel(currentQuestion?.difficulty)}
                            </div>
                        </div>

                        <div className="quiz-progress-track" aria-hidden="true">
                            <div className="quiz-progress-fill" style={{ width: `${quizProgressPercent}%` }} />
                        </div>

                        <div className="quiz-stats-row">
                            <div className="timer-section">Thời gian còn lại: {timeLeft}s</div>
                            <div className="quiz-stats">Tổng điểm hiện tại: {score} điểm | Điểm câu này: {currentQuestionPoints}</div>
                            <div className="lives-section">Số mạng còn lại: {lives}</div>
                        </div>

                        <div className="question-section">
                            <div className="question-text">
                                {currentQuestion?.content}
                            </div>
                            <div className="question-divider" />
                        </div>

                        <div className="answer-section">
                            {currentQuestion?.answers?.map((answer, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={getAnswerClassName(answer, index)}
                                    disabled={isRevealingAnswer}
                                    onClick={() => handleAnswerClick(answer, index)}
                                >
                                    <span className="answer-label">{String.fromCharCode(65 + index)}.</span>
                                    <span className="answer-content">{answer.content}</span>
                                </button>
                            ))}
                        </div>

                        <div className="quiz-bottom-actions">
                            <button type="button" className="quiz-back-link" onClick={resetToQuizHome}>
                                ← Quay lại
                            </button>
                            <button
                                type="button"
                                className="quiz-next-button"
                                disabled={isRevealingAnswer}
                                onClick={() => handleAnswerClick({ is_correct: false }, null)}
                            >
                                Tiếp theo →
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="quiz-status">Không có câu hỏi hợp lệ để bắt đầu trò chơi.</div>
                )
            )}
        </div>
    );
};

export default QuizGame;