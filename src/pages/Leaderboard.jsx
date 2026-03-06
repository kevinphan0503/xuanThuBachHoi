import React, { useEffect, useState } from 'react';
import { apiFetch } from '../config/api';
import './Leaderboard.css';

const Leaderboard = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

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
                <h1 className="leaderboard-title">Bảng Xếp Hạng Quiz</h1>
                <p className="leaderboard-subtitle">Top 8 người chơi có điểm cao nhất. Nếu trùng điểm, người có thời gian hoàn thành ít hơn sẽ xếp trên.</p>

                {isLoading ? (
                    <div className="leaderboard-status">Đang tải dữ liệu...</div>
                ) : errorMessage ? (
                    <div className="leaderboard-status leaderboard-error">{errorMessage}</div>
                ) : items.length === 0 ? (
                    <div className="leaderboard-status">Chưa có dữ liệu xếp hạng.</div>
                ) : (
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
                                    <tr key={`${entry.display_name}-${entry.completed_at}-${index}`}>
                                        <td>{index + 1}</td>
                                        <td>{entry.display_name}</td>
                                        <td>{entry.score}</td>
                                        <td>{entry.time_spent_seconds}</td>
                                        <td>{new Date(entry.completed_at).toLocaleString('vi-VN')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Leaderboard;
