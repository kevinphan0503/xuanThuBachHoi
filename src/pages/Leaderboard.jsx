import React, { useEffect, useState } from 'react';
import { apiFetch } from '../config/api';
import './Leaderboard.css';

const Leaderboard = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const topPlayerName = items[0]?.display_name || '-';
    const highestScore = Number(items[0]?.score || 0);
    const fastestTime = items.length > 0
        ? Math.min(...items.map((entry) => Number(entry.time_spent_seconds) || Number.POSITIVE_INFINITY))
        : Number.POSITIVE_INFINITY;
    const fastestTimeDisplay = Number.isFinite(fastestTime) ? fastestTime : '-';

    const formatScore = (value) => Number(value || 0).toLocaleString('vi-VN');

    const formatCompletedAt = (value) => {
        if (!value) return '-';
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) return '-';
        return parsed.toLocaleString('vi-VN');
    };

    const getInitials = (name) => {
        const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
        if (parts.length === 0) return '?';
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    };

    const getAvatarStyle = (index) => ({
        background: `hsl(${(index * 37) % 360} 52% 82%)`,
    });

    useEffect(() => {
        let mounted = true;

        const loadLeaderboard = async () => {
            try {
                setIsLoading(true);
                const data = await apiFetch('/api/quiz/leaderboard?limit=8');
                if (!mounted) return;
                setItems(Array.isArray(data) ? data : []);
            } catch (error) {
                if (!mounted) return;
                setErrorMessage('Không thể tải bảng xếp hạng. Vui lòng thử lại.');
            } finally {
                if (mounted) setIsLoading(false);
            }
        };

        loadLeaderboard();

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <section className="leaderboard-page">
            <div className="container leaderboard-wrap">
                <div className="leaderboard-head leaderboard-fade-up">
                    <div className="leaderboard-head-copy">
                        <h1 className="leaderboard-title">Bảng Xếp Hạng Quiz</h1>
                        <p className="leaderboard-subtitle">Top 8 người chơi có điểm cao nhất. Nếu trùng điểm, người có thời gian hoàn thành ít hơn sẽ xếp trên.</p>
                    </div>
                    <div className="leaderboard-filter-group" aria-hidden="true">
                        <span className="leaderboard-filter is-active">Tất cả</span>
                        <span className="leaderboard-filter">Tháng này</span>
                        <span className="leaderboard-filter">Hôm nay</span>
                    </div>
                </div>

                {isLoading ? (
                    <div className="leaderboard-status leaderboard-fade-up">Đang tải dữ liệu...</div>
                ) : errorMessage ? (
                    <div className="leaderboard-status leaderboard-error leaderboard-fade-up">{errorMessage}</div>
                ) : items.length === 0 ? (
                    <div className="leaderboard-status leaderboard-fade-up">Chưa có dữ liệu xếp hạng.</div>
                ) : (
                    <div className="leaderboard-content leaderboard-fade-up">
                        <div className="leaderboard-stats-grid">
                            <article className="leaderboard-stat-card">
                                <div className="leaderboard-stat-label">Người dẫn đầu</div>
                                <div className="leaderboard-stat-value">{topPlayerName}</div>
                            </article>
                            <article className="leaderboard-stat-card">
                                <div className="leaderboard-stat-label">Điểm cao nhất</div>
                                <div className="leaderboard-stat-value">{formatScore(highestScore)}</div>
                            </article>
                            <article className="leaderboard-stat-card">
                                <div className="leaderboard-stat-label">Thời gian nhanh nhất</div>
                                <div className="leaderboard-stat-value">{fastestTimeDisplay}s</div>
                            </article>
                        </div>

                        <div className="leaderboard-table-shell">
                            <div className="leaderboard-table-wrap">
                                <table className="leaderboard-table">
                                    <thead>
                                        <tr>
                                            <th>Hạng</th>
                                            <th>Người chơi</th>
                                            <th>Điểm</th>
                                            <th>Thời gian (giây)</th>
                                            <th>Hoàn thành</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((entry, index) => (
                                            <tr
                                                key={`${entry.display_name}-${entry.completed_at}-${index}`}
                                                className={`leaderboard-row leaderboard-fade-up ${index < 3 ? `is-top-${index + 1}` : ''}`}
                                                style={{ '--row-delay': `${0.26 + index * 0.06}s` }}
                                            >
                                                <td className="rank-cell">
                                                    <span className={`rank-badge rank-${index + 1}`}>{index + 1}</span>
                                                </td>
                                                <td>
                                                    <div className="player-cell">
                                                        <span className="player-avatar" style={getAvatarStyle(index)}>{getInitials(entry.display_name)}</span>
                                                        <span className="player-name">{entry.display_name || 'Ẩn danh'}</span>
                                                    </div>
                                                </td>
                                                <td className="score-cell">{formatScore(entry.score)}</td>
                                                <td className="time-cell">{entry.time_spent_seconds}</td>
                                                <td className="completed-cell">
                                                    <span className="completion-badge">Hoàn thành</span>
                                                    <span className="completed-at">{formatCompletedAt(entry.completed_at)}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="leaderboard-footnote">Hiển thị {items.length} người chơi trong bảng xếp hạng hiện tại.</div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Leaderboard;
