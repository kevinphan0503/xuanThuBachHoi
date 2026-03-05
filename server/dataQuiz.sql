DO $$ 
DECLARE 
    q_id INT;
BEGIN
    /* =====================================================
       1. HỘI GIÓNG (Giả định festival_id = 1)
       ===================================================== */
    
    -- Câu 1
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng được tổ chức nhằm tưởng niệm nhân vật nào?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Vua Hùng', false), (q_id, 'Thánh Gióng', true), (q_id, 'Lạc Long Quân', false), (q_id, 'An Dương Vương', false);

    -- Câu 2
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Thánh Gióng là biểu tượng cho giá trị nào của dân tộc Việt Nam?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Sự khéo léo trong lao động', false), (q_id, 'Tinh thần yêu nước và ý chí quật cường', true), (q_id, 'Đời sống tâm linh nông nghiệp', false), (q_id, 'Sự giao thương và hội nhập', false);

    -- Câu 3
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng là lễ hội truyền thống của quốc gia nào?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Trung Quốc', false), (q_id, 'Việt Nam', true), (q_id, 'Lào', false), (q_id, 'Campuchia', false);

    -- Câu 4
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng đền Sóc được tổ chức tại đâu?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Gia Lâm', false), (q_id, 'Ba Vì', false), (q_id, 'Sóc Sơn', true), (q_id, 'Đông Anh', false);

    -- Câu 5
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng Phù Đổng thuộc khu vực nào của Hà Nội?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Gia Lâm', true), (q_id, 'Hoàn Kiếm', false), (q_id, 'Tây Hồ', false), (q_id, 'Hà Đông', false);

    -- Câu 6
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng đền Sóc diễn ra vào tháng mấy âm lịch?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tháng Giêng', true), (q_id, 'Tháng Hai', false), (q_id, 'Tháng Ba', false), (q_id, 'Tháng Tư', false);

    -- Câu 7
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng Phù Đổng diễn ra vào tháng mấy âm lịch?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tháng Hai', false), (q_id, 'Tháng Ba', false), (q_id, 'Tháng Tư', true), (q_id, 'Tháng Năm', false);

    -- Câu 8
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng phản ánh tín ngưỡng gì?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thờ thần tài', false), (q_id, 'Thờ anh hùng dân tộc', true), (q_id, 'Thờ tổ nghề', false), (q_id, 'Thờ mẫu', false);

    -- Câu 9
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Một trong các hoạt động chính của Hội Gióng là gì?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thi nấu ăn', false), (q_id, 'Rước kiệu', true), (q_id, 'Đua thuyền', false), (q_id, 'Đấu vật chuyên nghiệp', false);

    -- Câu 10
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Thánh Gióng bay về trời tại đâu?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Phù Đổng', false), (q_id, 'Gia Lâm', false), (q_id, 'Sóc Sơn', true), (q_id, 'Ba Vì', false);

    -- Câu 11
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng được UNESCO công nhận là gì?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Di sản thiên nhiên', false), (q_id, 'Di sản vật thể', false), (q_id, 'Di sản văn hóa phi vật thể', true), (q_id, 'Kỳ quan thế giới', false);

    -- Câu 12
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng thể hiện tinh thần gì của dân tộc Việt Nam?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tinh thần hưởng thụ', false), (q_id, 'Tinh thần yêu nước', true), (q_id, 'Tinh thần thương mại', false), (q_id, 'Tinh thần cá nhân', false);

    -- Câu 13
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng đền Sóc kéo dài trong bao nhiêu ngày?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, '1 ngày', false), (q_id, '2 ngày', false), (q_id, '3 ngày', true), (q_id, '4 ngày', false);

    -- Câu 14
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng Phù Đổng tái hiện điều gì?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Cuộc sống cung đình', false), (q_id, 'Các chặng đường đánh giặc', true), (q_id, 'Lễ cưới truyền thống', false), (q_id, 'Sự tích bánh chưng', false);

    -- Câu 15
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng là biểu tượng của điều gì?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Giàu sang', false), (q_id, 'Quyền lực', false), (q_id, 'Đoàn kết dân tộc', true), (q_id, 'Thương mại phát triển', false);

    /* =====================================================
       2. HỘI LIM (Giả định festival_id = 2)
       ===================================================== */

    -- Câu 1
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hội Lim còn được gọi là gì?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Hội chùa Dâu', false), (q_id, 'Hội đền Đô', false), (q_id, 'Hội chùa làng Lim', true), (q_id, 'Hội Kinh Bắc', false);

    -- Câu 2
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hội Lim diễn ra vào thời gian nào âm lịch?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, '10–12 tháng Giêng', false), (q_id, '11–13 tháng Giêng', false), (q_id, '12–14 tháng Giêng', false), (q_id, '13–15 tháng Giêng', true);

    -- Câu 3
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Chính hội Hội Lim diễn ra vào ngày nào?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Ngày 12 tháng Giêng', false), (q_id, 'Ngày 13 tháng Giêng', true), (q_id, 'Ngày 14 tháng Giêng', false), (q_id, 'Ngày 15 tháng Giêng', false);

    -- Câu 4
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hội Lim là lễ hội tiêu biểu của vùng nào?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tây Bắc', false), (q_id, 'Kinh Bắc', true), (q_id, 'Nam Bộ', false), (q_id, 'Tây Nguyên', false);

    -- Câu 5
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hội Lim thuộc tỉnh nào hiện nay?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Hà Nam', false), (q_id, 'Hải Dương', false), (q_id, 'Bắc Giang', false), (q_id, 'Bắc Ninh', true);

    -- Câu 6
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Nguồn gốc Hội Lim gắn với hoạt động nào của cư dân xưa?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thi võ', false), (q_id, 'Ca hát và hội chùa cổ', true), (q_id, 'Buôn bán đầu xuân', false), (q_id, 'Đua thuyền', false);

    -- Câu 7
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hội Lim có liên hệ biểu tượng với nhân vật nào trong truyện cổ tích?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thạch Sanh', false), (q_id, 'Tấm', false), (q_id, 'Trương Chi', true), (q_id, 'Sọ Dừa', false);

    -- Câu 8
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hội Lim phản ánh vai trò đặc biệt của yếu tố nào trong đời sống tinh thần người Việt?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Võ thuật', false), (q_id, 'Tiếng hát giao duyên', true), (q_id, 'Thương mại', false), (q_id, 'Nông nghiệp', false);

    -- Câu 9
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Từ thế kỷ XIX đến nửa đầu thế kỷ XX, Hội Lim trở thành gì của Kinh Bắc?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Trung tâm thương mại', false), (q_id, 'Không gian văn hóa – nghệ thuật đặc sắc', true), (q_id, 'Căn cứ quân sự', false), (q_id, 'Khu hành chính', false);

    -- Câu 10
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hội Lim từng bị gián đoạn trong giai đoạn nào?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thời bình', false), (q_id, 'Thời kỳ chiến tranh', true), (q_id, 'Thời kỳ phong kiến', false), (q_id, 'Thời kỳ hiện đại hóa', false);

    -- Câu 11
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Sau khi đất nước thống nhất, Hội Lim được tổ chức như thế nào?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, '5 năm một lần', false), (q_id, 'Không còn tổ chức', false), (q_id, 'Tổ chức thường niên', true), (q_id, 'Chỉ tổ chức khi có tài trợ', false);

    -- Câu 12
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hội Lim góp phần bảo tồn loại hình dân ca nào?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Ca trù', false), (q_id, 'Hò Huế', false), (q_id, 'Quan họ Bắc Ninh', true), (q_id, 'Đờn ca tài tử', false);

    -- Câu 13
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Dân ca Quan họ Bắc Ninh được UNESCO công nhận vào năm nào?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, '2005', false), (q_id, '2007', false), (q_id, '2009', true), (q_id, '2011', false);

    -- Câu 14
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Các nghi lễ chính trong Hội Lim gồm những gì?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Đấu vật, đua ngựa', false), (q_id, 'Dâng hương, rước và tế lễ', true), (q_id, 'Thi nấu ăn', false), (q_id, 'Biểu diễn xiếc', false);

    -- Câu 15
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hoạt động nổi bật trong phần hội của Hội Lim là gì?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Đua thuyền', false), (q_id, 'Hát Quan họ giao duyên trên sông Tiêu', true), (q_id, 'Đấu cờ người', false), (q_id, 'Thi thư pháp', false);
END $$;

DO $$ 
DECLARE 
    q_id INT;
BEGIN
    /* =====================================================
       3. LỄ KHAO LỀ THẾ LÍNH (Giả định festival_id = 3)
       ===================================================== */
    
    -- Câu 1
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Đội Hoàng Sa được thành lập vào khoảng thời gian nào?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Đầu thế kỷ XVII', true), (q_id, 'Cuối thế kỷ XVIII', false), (q_id, 'Đầu thế kỷ XIX', false), (q_id, 'Thế kỷ XX', false);

    -- Câu 2
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Đội Hoàng Sa được thành lập dưới thời ai?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Vua Lê', false), (q_id, 'Chúa Nguyễn', true), (q_id, 'Vua Quang Trung', false), (q_id, 'Vua Gia Long', false);

    -- Câu 3
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Đội Hoàng Sa xuất phát chủ yếu từ đâu?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Bình Định', false), (q_id, 'Đà Nẵng', false), (q_id, 'Sa Kỳ và Lý Sơn', true), (q_id, 'Phú Yên', false);

    -- Câu 4
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Đội Hoàng Sa ra khai thác ở khu vực nào?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Côn Đảo', false), (q_id, 'Phú Quốc', false), (q_id, 'Cát Bà', false), (q_id, 'Hoàng Sa – Trường Sa', true);

    -- Câu 5
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Lễ Khao lề Thế lính Hoàng Sa diễn ra vào tháng nào âm lịch?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tháng 2', true), (q_id, 'Tháng 3', false), (q_id, 'Tháng 4', false), (q_id, 'Tháng 5', false);

    -- Câu 6
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Người dân tổ chức lễ để tưởng nhớ ai?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Ngư dân hiện đại', false), (q_id, 'Đội lính Hoàng Sa – Trường Sa', true), (q_id, 'Thương nhân biển', false), (q_id, 'Quan lại triều đình', false);

    -- Câu 7
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Một trong các nghi lễ chính là gì?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Đua ngựa', false), (q_id, 'Thi võ', false), (q_id, 'Thả thuyền mô hình ra biển', true), (q_id, 'Bắn pháo hoa', false);

    -- Câu 8
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Lễ hội đua thuyền truyền thống trong lễ mang tên gì?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Long – Lân', false), (q_id, 'Long – Phượng', false), (q_id, 'Tứ Phủ', false), (q_id, 'Tứ Linh', true);

    -- Câu 9
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Lễ Khao lề Thế lính Hoàng Sa được công nhận Di sản quốc gia vào năm nào?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, '2013', true), (q_id, '2010', false), (q_id, '2015', false), (q_id, '2009', false);

    -- Câu 10
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Lễ diễn ra chủ yếu tại đâu?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Lý Sơn', true), (q_id, 'Nha Trang', false), (q_id, 'Vũng Tàu', false), (q_id, 'Huế', false);

    -- Câu 11
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Một hoạt động văn hóa đi kèm lễ là gì?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Đấu vật', false), (q_id, 'Hát bội', true), (q_id, 'Nhạc rock', false), (q_id, 'Xiếc thú', false);

    -- Câu 12
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Đội Hoàng Sa xuất phát ra biển vào tháng mấy âm lịch?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tháng 1', false), (q_id, 'Tháng 5', false), (q_id, 'Tháng 2–3', true), (q_id, 'Tháng 7', false);

    -- Câu 13
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Đội Hoàng Sa trở về vào tháng nào âm lịch?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tháng 6', false), (q_id, 'Tháng 7', false), (q_id, 'Tháng 8', true), (q_id, 'Tháng 9', false);

    -- Câu 14
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Những ngôi “mộ gió” xuất hiện ở đâu?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Phú Quốc', false), (q_id, 'Côn Đảo', false), (q_id, 'Sa Kỳ', false), (q_id, 'Lý Sơn', true);

    -- Câu 15
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Lễ có ý nghĩa cầu điều gì cho ngư dân?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Bình an', true), (q_id, 'Giàu có', false), (q_id, 'Thăng chức', false), (q_id, 'Danh tiếng', false);


    /* =====================================================
       4. LỄ HỘI XUÂN YÊN TỬ (Giả định festival_id = 4)
       ===================================================== */

    -- Câu 1
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Lễ hội xuân Yên Tử gắn liền với nhân vật lịch sử nào?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Trần Hưng Đạo', false), (q_id, 'Trần Nhân Tông', true), (q_id, 'Lý Công Uẩn', false), (q_id, 'Lê Lợi', false);

    -- Câu 2
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Lễ hội xuân Yên Tử được tổ chức tại tỉnh nào?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Quảng Ninh', true), (q_id, 'Bắc Ninh', false), (q_id, 'Hải Dương', false), (q_id, 'Hà Nội', false);

    -- Câu 3
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Trần Nhân Tông là người sáng lập thiền phái nào?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thiền phái Lâm Tế', false), (q_id, 'Thiền phái Tào Động', false), (q_id, 'Thiền phái Trúc Lâm', true), (q_id, 'Thiền phái Vô Ngôn Thông', false);

    -- Câu 4
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Yên Tử được xem là đất tổ của tôn giáo nào tại Việt Nam?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Đạo giáo', false), (q_id, 'Nho giáo', false), (q_id, 'Thiên Chúa giáo', false), (q_id, 'Phật giáo Việt Nam', true);

    -- Câu 5
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'UNESCO công nhận quần thể Yên Tử là Di sản Văn hóa Thế giới vào năm nào?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, '2025', true), (q_id, '2020', false), (q_id, '2015', false), (q_id, '2010', false);

    -- Câu 6
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Một trong các nghi lễ chính của lễ hội là gì?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Đấu vật', false), (q_id, 'Dâng hương', true), (q_id, 'Đua thuyền', false), (q_id, 'Thi võ', false);

    -- Câu 7
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Hoạt động hành hương nổi bật trong lễ hội là lên đâu?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Chùa Hương', false), (q_id, 'Chùa Một Cột', false), (q_id, 'Chùa Đồng', true), (q_id, 'Chùa Bái Đính', false);

    -- Câu 8
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Lễ khai hội có hoạt động nào sau đây?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thỉnh chuông', true), (q_id, 'Đua ngựa', false), (q_id, 'Thi cờ người', false), (q_id, 'Thi nấu ăn', false);

    -- Câu 9
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Lễ hội thể hiện triết lý nào?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tu trong đời', true), (q_id, 'Tu tách biệt xã hội', false), (q_id, 'Sống ẩn dật', false), (q_id, 'Chinh phục tự nhiên', false);

    -- Câu 10
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Một hoạt động hội trong lễ là gì?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Võ cổ truyền', true), (q_id, 'Bóng đá', false), (q_id, 'Đua xe', false), (q_id, 'Xiếc thú', false);

    -- Câu 11
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Lễ cầu quốc thái dân an mang ý nghĩa gì?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Cầu giàu sang', false), (q_id, 'Cầu bình an cho đất nước', true), (q_id, 'Cầu thăng quan', false), (q_id, 'Cầu chiến thắng', false);

    -- Câu 12
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Trần Nhân Tông thuộc triều đại nào?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Nhà Lý', false), (q_id, 'Nhà Lê', false), (q_id, 'Nhà Nguyễn', false), (q_id, 'Nhà Trần', true);

    -- Câu 13
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Nghi lễ mở cửa rừng thể hiện điều gì?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tôn vinh thiên nhiên', true), (q_id, 'Khai thác gỗ', false), (q_id, 'Du lịch sinh thái', false), (q_id, 'Thi đấu', false);

    -- Câu 14
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Yên Tử thuộc khu di tích danh thắng nào?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Yên Tử – Vĩnh Nghiêm – Côn Sơn – Kiếp Bạc', true), (q_id, 'Tràng An', false), (q_id, 'Phong Nha', false), (q_id, 'Mỹ Sơn', false);

    -- Câu 15
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Lễ hội xuân Yên Tử diễn ra chủ yếu vào mùa nào?', 'EASY', 10) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Mùa xuân', true), (q_id, 'Mùa hè', false), (q_id, 'Mùa thu', false), (q_id, 'Mùa đông', false);

END $$;

DO $$ 
DECLARE 
    q_id INT;
BEGIN
    /* =====================================================
       5. KỲ YÊN HẠ ĐIỀN (festival_id = 5)
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content) VALUES (5, 'Lễ hội Kỳ Yên Hạ Điền thường tổ chức vào thời gian nào?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Tháng 1 âm lịch',false),(q_id,'Tháng 4 âm lịch',false),(q_id,'Tháng 7 âm lịch',false),(q_id,'Tháng 12 âm lịch',true);

    INSERT INTO quiz_questions (festival_id, content) VALUES (5, 'Lễ hội Kỳ Yên Hạ Điền thuộc khu vực nào của Việt Nam?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Bắc Bộ',false),(q_id,'Trung Bộ',false),(q_id,'Nam Bộ',true),(q_id,'Tây Bắc',false);

    INSERT INTO quiz_questions (festival_id, content) VALUES (5, 'Lễ hội Kỳ Yên Hạ Điền thường được tổ chức tại:') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Nhà thờ',false),(q_id,'Đình làng',true),(q_id,'Trường học',false),(q_id,'Chợ',false);

    INSERT INTO quiz_questions (festival_id, content) VALUES (5, 'Lễ hội Kỳ Yên Hạ Điền mang đậm đặc trưng của nền kinh tế nào?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Nông nghiệp',true),(q_id,'Thương mại',false),(q_id,'Công nghiệp',false),(q_id,'Dịch vụ',false);

    /* =====================================================
       6. HỘI ĐUA VOI BUÔN ĐÔN (festival_id = 6)
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content) VALUES (6, 'Hội Đua Voi Buôn Đôn được tổ chức bao lâu một lần?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Hằng năm',false),(q_id,'2 năm một lần',true),(q_id,'5 năm một lần',false),(q_id,'10 năm một lần',false);

    INSERT INTO quiz_questions (festival_id, content) VALUES (6, 'Hội Đua Voi Buôn Đôn diễn ra tại tỉnh nào?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Gia Lai',false),(q_id,'Đắk Lắk',true),(q_id,'Kon Tum',false),(q_id,'Lâm Đồng',false);

    INSERT INTO quiz_questions (festival_id, content) VALUES (6, 'Dân tộc gắn liền với lễ hội là:') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'M’nông',true),(q_id,'Kinh',false),(q_id,'Hoa',false),(q_id,'Thái',false);

    /* =====================================================
       7. LỄ HỘI ĐỀN HÙNG (festival_id = 7)
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content) VALUES (7, 'Lễ hội Đền Hùng diễn ra vào ngày nào âm lịch?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'15/1',false),(q_id,'2/9',false),(q_id,'30/4',false),(q_id,'10/3',true);

    INSERT INTO quiz_questions (festival_id, content) VALUES (7, 'Lễ hội Đền Hùng được tổ chức tại tỉnh nào?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Phú Thọ',true),(q_id,'Hà Nội',false),(q_id,'Ninh Bình',false),(q_id,'Thanh Hóa',false);

    INSERT INTO quiz_questions (festival_id, content) VALUES (7, 'Lễ hội nhằm tưởng nhớ:') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Các vua Trần',false),(q_id,'Chủ tịch Hồ Chí Minh',false),(q_id,'Các vua Hùng',true),(q_id,'Hai Bà Trưng',false);

    /* =====================================================
       8. LỄ HỘI BÁNH DÂN GIAN NAM BỘ (festival_id = 8)
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content) VALUES (8, 'Lễ hội Bánh Dân Gian Nam Bộ được tổ chức tại đâu?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Hà Nội',false),(q_id,'Huế',false),(q_id,'Cần Thơ',true),(q_id,'Nha Trang',false);

    INSERT INTO quiz_questions (festival_id, content) VALUES (8, 'Nội dung chính của lễ hội là:') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Thi thể thao',false),(q_id,'Triển lãm công nghiệp',false),(q_id,'Hội chợ xe máy',false),(q_id,'Giới thiệu bánh dân gian Nam Bộ',true);

    INSERT INTO quiz_questions (festival_id, content) VALUES (8, 'Lễ hội nhằm tôn vinh đối tượng nào?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Doanh nghiệp nước ngoài',false),(q_id,'Nghệ nhân làm bánh truyền thống',true),(q_id,'Vận động viên thể thao',false),(q_id,'Ca sĩ nổi tiếng',false);

    /* =====================================================
       9. TẾT TRUNG THU (festival_id = 9)
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content) VALUES (9, 'Tết Trung Thu diễn ra vào ngày nào?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Rằm tháng Giêng',false),(q_id,'Rằm tháng Tám âm lịch',true),(q_id,'Mùng 5 tháng 5',false),(q_id,'Mùng 10 tháng 3',false);

    INSERT INTO quiz_questions (festival_id, content) VALUES (9, 'Tết Trung Thu còn được gọi là gì?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Tết Nguyên Tiêu',false),(q_id,'Tết Đoàn viên',true),(q_id,'Tết Hàn Thực',false),(q_id,'Tết Đoan Ngọ',false);

    INSERT INTO quiz_questions (festival_id, content) VALUES (9, 'Trẻ em thường làm gì trong Tết Trung Thu?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Đua thuyền',false),(q_id,'Rước đèn',true),(q_id,'Đấu vật',false),(q_id,'Cày ruộng',false);

    /* =====================================================
       10. LỄ HỘI ĐUA BÒ BẢY NÚI (festival_id = 10)
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content) VALUES (10, 'Lễ hội Đua bò Bảy Núi diễn ra ở tỉnh nào?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Sóc Trăng',false),(q_id,'An Giang',true),(q_id,'Kiên Giang',false),(q_id,'Cà Mau',false);

    INSERT INTO quiz_questions (festival_id, content) VALUES (10, 'Hoạt động chính của lễ hội là gì?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Đua ngựa',false),(q_id,'Đấu vật',false),(q_id,'Đua bò trên ruộng bùn',true),(q_id,'Đua thuyền',false);

    /* =====================================================
       11. LỄ HỘI NGHINH ÔNG (festival_id = 11)
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content) VALUES (11, 'Lễ hội Nghinh Ông gắn với tín ngưỡng thờ gì?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Cá chép',false),(q_id,'Rùa biển',false),(q_id,'Cá Ông (cá voi)',true),(q_id,'Thần Núi',false);

    INSERT INTO quiz_questions (festival_id, content) VALUES (11, 'Ngư dân tin Cá Ông có vai trò gì?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Gọi mưa',false),(q_id,'Bảo hộ khi ra khơi',true),(q_id,'Xua tà ma',false),(q_id,'Gọi gió',false);

    /* =====================================================
       12. LỄ HỘI HOA TAM GIÁC MẠCH (festival_id = 12)
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content) VALUES (12, 'Lễ hội Hoa tam giác mạch diễn ra ở đâu?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Lào Cai',false),(q_id,'Hà Giang',true),(q_id,'Cao Bằng',false),(q_id,'Sơn La',false);

    INSERT INTO quiz_questions (festival_id, content) VALUES (12, 'Hoa tam giác mạch thường nở rộ vào tháng nào?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Tháng 3',false),(q_id,'Tháng 5',false),(q_id,'Tháng 11',true),(q_id,'Tháng 1',false);

    /* =====================================================
       13. LỄ HỘI KATE - NINH THUẬN (festival_id = 13)
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content) VALUES (13, 'Lễ hội Katê là lễ hội truyền thống của dân tộc nào?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Kinh',false),(q_id,'Khmer',false),(q_id,'Chăm',true),(q_id,'Êđê',false);

    INSERT INTO quiz_questions (festival_id, content) VALUES (13, 'Katê là lễ hội tiêu biểu của người Chăm theo tôn giáo nào?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Phật giáo',false),(q_id,'Thiên Chúa giáo',false),(q_id,'Bà La Môn',true),(q_id,'Cao Đài',false);

    /* =====================================================
       14. OK OM BOK (festival_id = 14)
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content) VALUES (14, 'Ok Om Bok là lễ hội của dân tộc nào?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Chăm',false),(q_id,'Êđê',false),(q_id,'Khmer',true),(q_id,'Tày',false);

    INSERT INTO quiz_questions (festival_id, content) VALUES (14, 'Người Khmer tổ chức lễ Ok Bom Bok để tạ ơn ai?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Thần Núi',false),(q_id,'Mặt Trời',false),(q_id,'Mặt Trăng',true),(q_id,'Thần Lúa',false);

    /* =====================================================
       15. MỪNG LÚA MỚI Ê ĐÊ (festival_id = 15)
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content) VALUES (15, 'Lễ hội Mừng lúa mới thuộc dân tộc nào?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Khmer',false),(q_id,'Êđê',true),(q_id,'Chăm',false),(q_id,'Kinh',false);

    INSERT INTO quiz_questions (festival_id, content) VALUES (15, 'Lễ hội Mừng lúa mới nhằm tạ ơn ai?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Thần biển',false),(q_id,'Thần núi',false),(q_id,'Trời đất, tổ tiên, thần lúa',true),(q_id,'Anh hùng dân tộc',false);

    /* =====================================================
       16. CỒNG CHIÊNG TÂY NGUYÊN (festival_id = 16)
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content) VALUES (16, 'Lễ hội Cồng chiêng thuộc khu vực nào?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Đồng bằng sông Hồng',false),(q_id,'Tây Nguyên',true),(q_id,'Nam Bộ',false),(q_id,'Bắc Trung Bộ',false);

    INSERT INTO quiz_questions (festival_id, content) VALUES (16, 'Cồng chiêng được xem là gì?') RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES (q_id,'Nhạc cụ giải trí',false),(q_id,'Tiếng nói tâm linh',true),(q_id,'Công cụ lao động',false),(q_id,'Vũ khí',false);

END $$;

DO $$ 
DECLARE 
    q_id INT;
BEGIN
    /* =====================================================
       1. HỘI GIÓNG (festival_id = 1) - MỨC ĐỘ TRUNG BÌNH
       ===================================================== */
    
    -- Câu 16
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng đền Sóc (Sóc Sơn) gắn với sự kiện nào trong truyền thuyết Thánh Gióng?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Nơi Thánh Gióng sinh ra', false), (q_id, 'Nơi luyện tập binh khí', false), (q_id, 'Nơi Thánh Gióng bay về trời sau khi đánh giặc', true), (q_id, 'Nơi phong tướng cho Thánh Gióng', false);

    -- Câu 17
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng Phù Đổng diễn ra từ ngày nào đến ngày nào âm lịch?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, '5–7 tháng 4', false), (q_id, '6–8 tháng 4', false), (q_id, '7–9 tháng 4', true), (q_id, '8–10 tháng 4', false);

    -- Câu 18
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Đền Sóc gắn với sự kiện nào trong truyền thuyết Thánh Gióng?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Gióng ra đời', false), (q_id, 'Gióng đi học', false), (q_id, 'Gióng bay về trời', true), (q_id, 'Gióng cưới vợ', false);

    -- Câu 19
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Phù Đổng là nơi gắn với điều gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Nơi Thánh Gióng hóa thân', false), (q_id, 'Quê hương của Thánh Gióng', true), (q_id, 'Nơi diễn ra hội chợ', false), (q_id, 'Nơi thờ Vua Hùng', false);

    -- Câu 20
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng thuộc loại hình lễ hội nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Lễ hội thương mại', false), (q_id, 'Lễ hội du lịch', false), (q_id, 'Lễ hội truyền thống', true), (q_id, 'Lễ hội thể thao', false);

    -- Câu 21
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Giá trị nổi bật của Hội Gióng là gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Kinh tế', false), (q_id, 'Lịch sử – văn hóa – tinh thần', true), (q_id, 'Tài chính', false), (q_id, 'Công nghiệp', false);

    -- Câu 22
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Nghi thức nào thể hiện tính trang nghiêm trong Hội Gióng?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tế lễ', true), (q_id, 'Nhảy hiện đại', false), (q_id, 'Thi đấu bóng đá', false), (q_id, 'Ca nhạc thị trường', false);

    -- Câu 23
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng phản ánh truyền thống gì của người Việt?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Buôn bán', false), (q_id, 'Dựng nước và giữ nước', true), (q_id, 'Khai thác mỏ', false), (q_id, 'Hàng hải', false);

    -- Câu 24
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng được tổ chức trọng điểm tại đâu?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'TP.HCM', false), (q_id, 'Huế', false), (q_id, 'Hà Nội', true), (q_id, 'Đà Nẵng', false);

    -- Câu 25
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Diễn xướng dân gian trong Hội Gióng nhằm mục đích gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Giải trí đơn thuần', false), (q_id, 'Tái hiện sự kiện lịch sử', true), (q_id, 'Thu hút khách du lịch', false), (q_id, 'Thi tài năng', false);

    -- Câu 26
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng được UNESCO công nhận vì điều gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Quy mô lớn', false), (q_id, 'Giá trị văn hóa đặc biệt', true), (q_id, 'Lượng khách đông', false), (q_id, 'Vị trí địa lý đẹp', false);

    -- Câu 27
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Thánh Gióng là biểu tượng của điều gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Sự giàu có', false), (q_id, 'Tinh thần quật cường', true), (q_id, 'Quyền lực hoàng gia', false), (q_id, 'Thương mại phát triển', false);

    -- Câu 28
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hoạt động rước kiệu trong Hội Gióng mang ý nghĩa gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Trang trí', false), (q_id, 'Tưởng niệm và tôn vinh', true), (q_id, 'Giải trí', false), (q_id, 'Buôn bán', false);

    -- Câu 29
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng thể hiện sức mạnh gì của dân tộc?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Sức mạnh kinh tế', false), (q_id, 'Sức mạnh quân sự hiện đại', false), (q_id, 'Sức mạnh đoàn kết', true), (q_id, 'Sức mạnh công nghệ', false);

    -- Câu 30
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng được công nhận là di sản văn hóa phi vật thể ở cấp độ nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Quốc gia', false), (q_id, 'Khu vực', false), (q_id, 'Thế giới', true), (q_id, 'Tỉnh thành', false);

    /* =====================================================
       2. HỘI LIM BẮC NINH (festival_id = 2) - MỨC ĐỘ TRUNG BÌNH
       ===================================================== */

    -- Câu 16
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Nguồn gốc Hội Lim bắt nguồn từ hoạt động nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Buôn bán đầu xuân', false), (q_id, 'Thi võ nghệ', false), (q_id, 'Lễ hội ca hát và hội chùa cổ', true), (q_id, 'Đua thuyền', false);

    -- Câu 17
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hội Lim phát triển rực rỡ vào giai đoạn nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thế kỷ XVII', false), (q_id, 'Thế kỷ XIX đến nửa đầu XX', true), (q_id, 'Sau năm 2000', false), (q_id, 'Thế kỷ XXI', false);

    -- Câu 18
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Các nghi lễ chính của Hội Lim nhằm mục đích gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Cầu bình an và mùa màng bội thu', true), (q_id, 'Thi đấu nghệ thuật', false), (q_id, 'Giao lưu buôn bán', false), (q_id, 'Giải trí', false);

    -- Câu 19
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Quan họ trong Hội Lim chủ yếu thể hiện điều gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thi đấu âm nhạc', false), (q_id, 'Ca ngợi vua chúa', false), (q_id, 'Biểu diễn chuyên nghiệp', false), (q_id, 'Giao duyên nam nữ', true);

    -- Câu 20
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hội Lim góp phần quan trọng trong việc gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Bảo tồn và truyền dạy Quan họ', true), (q_id, 'Phát triển thương mại', false), (q_id, 'Mở rộng đô thị', false), (q_id, 'Thu hút đầu tư', false);

    -- Câu 21
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hội Lim thể hiện rõ đặc trưng văn hóa của vùng nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tây Nguyên', false), (q_id, 'Kinh Bắc', true), (q_id, 'Nam Bộ', false), (q_id, 'Tây Bắc', false);

    -- Câu 22
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Quan họ Bắc Ninh thuộc loại hình nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Nhạc cung đình', false), (q_id, 'Ca kịch', false), (q_id, 'Dân ca', true), (q_id, 'Nhạc hiện đại', false);

    -- Câu 23
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Phần hội của Hội Lim có đặc điểm gì nổi bật?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Mang tính quân sự', false), (q_id, 'Thi đấu thể thao chuyên nghiệp', false), (q_id, 'Hoạt động thương mại', false), (q_id, 'Trò chơi dân gian và hát giao duyên', true);

    -- Câu 24
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hội Lim từng bị gián đoạn vì nguyên nhân nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Chiến tranh', true), (q_id, 'Thiên tai', false), (q_id, 'Dịch bệnh', false), (q_id, 'Thiếu kinh phí', false);

    -- Câu 25
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Chính hội Hội Lim mang ý nghĩa gì nổi bật?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Mở đầu mùa vụ', false), (q_id, 'Tưởng niệm danh nhân', false), (q_id, 'Giao lưu thương mại', false), (q_id, 'Tôn vinh tiếng hát Quan họ', true);

    -- Câu 26
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Không gian tổ chức Hội Lim thường gắn với yếu tố nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Đình, chùa và đồi Lim', true), (q_id, 'Sân vận động', false), (q_id, 'Trung tâm thương mại', false), (q_id, 'Nhà hát hiện đại', false);

    -- Câu 27
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hội Lim góp phần duy trì giá trị nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Giá trị kinh tế', false), (q_id, 'Giá trị quân sự', false), (q_id, 'Giá trị văn hóa dân gian', true), (q_id, 'Giá trị công nghiệp', false);

    -- Câu 28
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hội Lim được khôi phục sau khi nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Sau cải cách ruộng đất', false), (q_id, 'Sau khi đất nước thống nhất', true), (q_id, 'Sau đổi mới 1986', false), (q_id, 'Sau năm 2000', false);

    -- Câu 29
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hát Quan họ giao duyên thể hiện điều gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tinh thần thi đấu', false), (q_id, 'Tình cảm nam nữ', true), (q_id, 'Truyền thống võ thuật', false), (q_id, 'Hoạt động buôn bán', false);

    -- Câu 30
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hội Lim có vai trò gì trong đời sống cộng đồng?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Gắn kết cộng đồng', true), (q_id, 'Phát triển công nghiệp', false), (q_id, 'Mở rộng thương mại', false), (q_id, 'Tăng thu ngân sách', false);

END $$;

DO $$ 
DECLARE 
    q_id INT;
BEGIN
    /* =====================================================
       3. LỄ KHAO LỀ THẾ LÍNH HOÀNG SA (festival_id = 3) - MEDIUM
       ===================================================== */
    
    -- Câu 16
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Hoạt động của đội Hoàng Sa nhằm mục đích gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Du lịch', false), (q_id, 'Khẳng định chủ quyền', true), (q_id, 'Buôn bán', false), (q_id, 'Thám hiểm giải trí', false);

    -- Câu 17
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Đội Hoàng Sa gồm thành phần nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Quan lại', false), (q_id, 'Ngư dân giỏi đi biển', true), (q_id, 'Thương nhân', false), (q_id, 'Binh lính triều đình chính quy', false);

    -- Câu 18
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Một nhiệm vụ của đội Hoàng Sa là gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Đo đạc thủy trình', true), (q_id, 'Xây dựng cảng', false), (q_id, 'Trồng cây', false), (q_id, 'Luyện võ', false);

    -- Câu 19
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Lễ thả thuyền mô hình mang ý nghĩa gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Giải trí', false), (q_id, 'Thi đấu', false), (q_id, 'Tưởng niệm', true), (q_id, 'Trang trí', false);

    -- Câu 20
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Lễ thuộc loại hình di sản nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Kiến trúc', false), (q_id, 'Lễ hội thể thao', false), (q_id, 'Nghệ thuật sân khấu', false), (q_id, 'Tập quán xã hội và tín ngưỡng', true);

    -- Câu 21
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Việc cắm mốc của đội Hoàng Sa thể hiện điều gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Khai thác kinh tế', false), (q_id, 'Bảo vệ chủ quyền', true), (q_id, 'Buôn bán', false), (q_id, 'Định cư', false);

    -- Câu 22
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Lễ đua thuyền Tứ Linh thể hiện điều gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tính quân sự', false), (q_id, 'Tính thương mại', false), (q_id, 'Văn hóa biển cộng đồng', true), (q_id, 'Tính cạnh tranh quốc tế', false);

    -- Câu 23
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, '“Mộ gió” mang ý nghĩa gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Mộ thật', false), (q_id, 'Mộ tượng trưng cho người mất tích', true), (q_id, 'Mộ danh nhân', false), (q_id, 'Mộ cổ khảo cổ', false);

    -- Câu 24
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Bộ nào công nhận lễ là Di sản quốc gia?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Bộ Nội vụ', false), (q_id, 'Bộ Giáo dục', false), (q_id, 'Bộ Văn hóa, Thể thao và Du lịch', true), (q_id, 'Bộ Quốc phòng', false);

    -- Câu 25
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Thời điểm tổ chức lễ nhằm mục đích gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Trước mùa vụ biển', true), (q_id, 'Sau thu hoạch', false), (q_id, 'Sau mùa mưa', false), (q_id, 'Cuối năm', false);

    -- Câu 26
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Lễ rước sắc thể hiện điều gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Sự tôn vinh lịch sử', true), (q_id, 'Hoạt động giải trí', false), (q_id, 'Buôn bán', false), (q_id, 'Thi đấu', false);

    -- Câu 27
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Các sinh hoạt văn hóa như múa lân góp phần gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tạo không khí lễ hội', true), (q_id, 'Quảng cáo', false), (q_id, 'Thương mại', false), (q_id, 'Chính trị', false);

    -- Câu 28
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Hoạt động của đội Hoàng Sa diễn ra trên vùng biển nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Biển Đông', true), (q_id, 'Biển Tây', false), (q_id, 'Vịnh Thái Lan', false), (q_id, 'Vịnh Bắc Bộ', false);

    -- Câu 29
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Lễ hoa đăng mang ý nghĩa gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Trang trí', false), (q_id, 'Tưởng niệm và cầu nguyện', true), (q_id, 'Thi đấu', false), (q_id, 'Buôn bán', false);

    -- Câu 30
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Giá trị lớn nhất của lễ hội là gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Lợi ích kinh tế', false), (q_id, 'Quảng bá du lịch', false), (q_id, 'Gìn giữ truyền thống lịch sử', true), (q_id, 'Thi đấu thể thao', false);


    /* =====================================================
       4. LỄ HỘI XUÂN YÊN TỬ (festival_id = 4) - MEDIUM
       ===================================================== */

    -- Câu 16
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Thiền phái Trúc Lâm mang đậm tinh thần gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Phật giáo Việt Nam', true), (q_id, 'Phật giáo Ấn Độ', false), (q_id, 'Phật giáo Trung Hoa', false), (q_id, 'Phật giáo Tây Tạng', false);

    -- Câu 17
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Triết lý “tu trong đời” nhấn mạnh điều gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tách biệt xã hội', false), (q_id, 'Tu tập giữa đời sống thường nhật', true), (q_id, 'Ẩn cư nơi núi rừng', false), (q_id, 'Rời bỏ gia đình', false);

    -- Câu 18
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Lễ hội góp phần bảo tồn giá trị nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Kinh tế', false), (q_id, 'Quân sự', false), (q_id, 'Lịch sử – văn hóa', true), (q_id, 'Công nghiệp', false);

    -- Câu 19
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Lễ khai hội có hoạt động đóng gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Đóng thuyền', false), (q_id, 'Đóng cửa rừng', false), (q_id, 'Đóng ấn thiêng Yên Tử', true), (q_id, 'Đóng kịch', false);

    -- Câu 20
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Thỉnh chuông và gióng trống mang ý nghĩa gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tăng âm thanh', false), (q_id, 'Khai mở không gian tâm linh', true), (q_id, 'Thu hút du khách', false), (q_id, 'Thi đấu', false);

    -- Câu 21
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Lễ hội lan tỏa triết lý sống nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Hướng thiện', true), (q_id, 'Hưởng thụ', false), (q_id, 'Cạnh tranh', false), (q_id, 'Chinh phục', false);

    -- Câu 22
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Hành hương lên chùa Đồng thể hiện điều gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Du lịch mạo hiểm', false), (q_id, 'Tinh thần tu tập và chiêm bái', true), (q_id, 'Hoạt động thương mại', false), (q_id, 'Thi đấu thể thao', false);

    -- Câu 23
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Quần thể Yên Tử được UNESCO công nhận ở cấp độ nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Di sản quốc gia', false), (q_id, 'Di sản khu vực', false), (q_id, 'Di sản Văn hóa Thế giới', true), (q_id, 'Kỳ quan thiên nhiên', false);

    -- Câu 24
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Lễ hội góp phần cân bằng điều gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Kinh tế – xã hội', false), (q_id, 'Chính trị – quân sự', false), (q_id, 'Công nghiệp – nông nghiệp', false), (q_id, 'Tâm – thân', true);

    -- Câu 25
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Võ cổ truyền trong lễ hội thể hiện điều gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tinh thần dân tộc', true), (q_id, 'Hoạt động thương mại', false), (q_id, 'Thi đấu chuyên nghiệp', false), (q_id, 'Giải trí đơn thuần', false);

    -- Câu 26
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Lễ hội Yên Tử thể hiện sự hòa hợp giữa điều gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Đạo và đời', true), (q_id, 'Quân sự và chính trị', false), (q_id, 'Kinh tế và thương mại', false), (q_id, 'Thể thao và du lịch', false);

    -- Câu 27
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Nghi lễ tụng kinh thể hiện yếu tố nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tín ngưỡng Phật giáo', true), (q_id, 'Chính trị', false), (q_id, 'Thể thao', false), (q_id, 'Thương mại', false);

    -- Câu 28
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Múa rồng trong lễ hội góp phần gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Trang trí', false), (q_id, 'Tạo không khí lễ hội', true), (q_id, 'Thi đấu', false), (q_id, 'Buôn bán', false);

    -- Câu 29
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Lễ hội Yên Tử có ý nghĩa lớn nhất về mặt nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thương mại', false), (q_id, 'Tâm linh', true), (q_id, 'Công nghiệp', false), (q_id, 'Thể thao', false);

    -- Câu 30
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Trần Nhân Tông sau khi nhường ngôi đã làm gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Đi buôn', false), (q_id, 'Đi tu tại Yên Tử', true), (q_id, 'Đi đánh trận', false), (q_id, 'Đi du lịch', false);

END $$;

DO $$ 
DECLARE 
    q_id INT;
BEGIN
    /* =====================================================
       5. KỲ YÊN HẠ ĐIỀN (festival_id = 5) - MEDIUM
       ===================================================== */
    -- Câu 25
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (5, 'Mục đích chính của lễ hội Kỳ Yên Hạ Điền là gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tổ chức thi đấu thể thao', false), (q_id, 'Tạ ơn trời đất, cầu mùa bội thu', true), (q_id, 'Tưởng niệm anh hùng dân tộc', false), (q_id, 'Giao lưu buôn bán', false);

    -- Câu 26
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (5, 'Lễ hội Kỳ Yên Hạ Điền phản ánh rõ nhất đặc trưng nào của xã hội Nam Bộ xưa?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Đời sống gắn chặt với sản xuất nông nghiệp', true), (q_id, 'Phát triển thương mại đường biển', false), (q_id, 'Ảnh hưởng mạnh của văn hóa cung đình', false), (q_id, 'Hoạt động quân sự là chủ yếu', false);

    -- Câu (Bổ sung 1)
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (5, 'Lễ Kỳ Yên Hạ Điền gắn liền với hoạt động nào của người dân?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Đánh bắt cá', false), (q_id, 'Xuống giống vụ mới', true), (q_id, 'Khai thác rừng', false), (q_id, 'Chăn nuôi', false);

    -- Câu (Bổ sung 2)
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (5, 'Nhân vật được thờ chính trong lễ Kỳ Yên thường là:', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Vua Hùng', false), (q_id, 'Phật', false), (q_id, 'Anh hùng dân tộc', false), (q_id, 'Thành hoàng làng', true);


    /* =====================================================
       6. HỘI ĐUA VOI BUÔN ĐÔN (festival_id = 6) - MEDIUM
       ===================================================== */
    -- Câu 27
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (6, 'Trong đời sống người M’nông, voi được xem là:', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thành viên quan trọng trong gia đình', true), (q_id, 'Con vật nuôi thông thường', false), (q_id, 'Vật nuôi chỉ dùng để giải trí', false), (q_id, 'Biểu tượng trang trí', false);

    -- Câu (Bổ sung 3)
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (6, 'Hội Đua Voi Buôn Đôn phản ánh đời sống của cộng đồng nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Người Kinh', false), (q_id, 'Người Chăm', false), (q_id, 'Người Ê-đê và M’nông', true), (q_id, 'Người Hoa', false);

    -- Câu 28
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (6, 'Việc tổ chức Hội Đua Voi Buôn Đôn định kỳ cho thấy điều gì về vai trò của lễ hội trong đời sống cộng đồng?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Chỉ phục vụ nhu cầu giải trí ngắn hạn', false), (q_id, 'Là hoạt động mang tính tự phát', false), (q_id, 'Có vai trò duy trì và tái khẳng định bản sắc văn hóa', true), (q_id, 'Chủ yếu nhằm mục đích kinh doanh', false);

    -- Câu (Bổ sung 4)
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (6, 'Ý nghĩa nổi bật của hội đua voi là gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thể hiện sức mạnh và kỹ năng thuần dưỡng voi', true), (q_id, 'Phát triển thương mại', false), (q_id, 'Tranh giành lãnh thổ', false), (q_id, 'Quảng bá sản phẩm', false);


    /* =====================================================
       7. LỄ HỘI ĐỀN HÙNG (festival_id = 7) - MEDIUM
       ===================================================== */
    -- Câu 29
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (7, 'Lễ hội Đền Hùng được tổ chức nhằm mục đích gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tưởng nhớ công lao các vua Hùng', true), (q_id, 'Kỷ niệm ngày độc lập', false), (q_id, 'Tôn vinh anh hùng thời hiện đại', false), (q_id, 'Tổ chức hội chợ', false);

    -- Câu 30
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (7, 'Điểm khác biệt nổi bật của Lễ hội Đền Hùng so với nhiều lễ hội truyền thống khác là gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Gắn với tín ngưỡng thờ thần tự nhiên', false), (q_id, 'Mang ý nghĩa tưởng nhớ tổ tiên chung của dân tộc', true), (q_id, 'Tổ chức theo chu kỳ mùa vụ nông nghiệp', false), (q_id, 'Chủ yếu mang tính giải trí', false);

    -- Câu (Bổ sung 5)
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (7, 'Hoạt động nào thường xuất hiện trong phần hội của lễ Đền Hùng?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Đua voi', false), (q_id, 'Hát xoan', true), (q_id, 'Lễ cúng lúa mới', false), (q_id, 'Thả đèn trời', false);


    /* =====================================================
       8. LỄ HỘI BÁNH DÂN GIAN NAM BỘ (festival_id = 8) - MEDIUM
       ===================================================== */
    -- Câu 31
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (8, 'Mục đích chính của lễ hội là gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tổ chức hội chợ công nghiệp', false), (q_id, 'Thi nấu ăn quốc tế', false), (q_id, 'Xuất khẩu thực phẩm', false), (q_id, 'Quảng bá bánh dân gian Nam Bộ', true);

    -- Câu 32
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (8, 'So với một hội chợ thương mại thông thường, điểm khác biệt cốt lõi của Lễ hội Bánh Dân Gian Nam Bộ là gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Có hoạt động mua bán sản phẩm', false), (q_id, 'Thu hút đông khách du lịch', false), (q_id, 'Gắn yếu tố kinh tế với bảo tồn giá trị văn hóa truyền thống', true), (q_id, 'Có sự tham gia của nhiều địa phương', false);

    -- Câu (Bổ sung 6)
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (8, 'Nguyên liệu chủ đạo trong nhiều loại bánh dân gian Nam Bộ là:', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Lúa mì', false), (q_id, 'Khoai tây', false), (q_id, 'Gạo và nếp', true), (q_id, 'Phô mai', false);

    -- Câu (Bổ sung 7)
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (8, 'Sự tham gia của nhiều tỉnh, thành tại lễ hội thể hiện điều gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Cạnh tranh thương mại giữa các địa phương', false), (q_id, 'Tính liên kết và giao lưu văn hóa vùng miền', true), (q_id, 'Xu hướng quốc tế hóa ẩm thực', false), (q_id, 'Sự thay thế ẩm thực truyền thống', false);

END $$;

DO $$ 
DECLARE 
    q_id INT;
BEGIN
    /* =====================================================
       9. TẾT TRUNG THU (festival_id = 9) - MEDIUM
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (9, '“Trung Thu” có nghĩa là gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Đầu mùa thu', false), (q_id, 'Cuối mùa thu', false), (q_id, 'Giữa mùa thu', true), (q_id, 'Lễ hội trăng', false);

    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (9, 'Tết Trung Thu gắn với thời kỳ nào của Trung Quốc?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Nhà Tống', false), (q_id, 'Nhà Đường', true), (q_id, 'Nhà Minh', false), (q_id, 'Nhà Thanh', false);

    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (9, 'Hình tròn – vuông của bánh trung thu tượng trưng cho gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Âm – dương', false), (q_id, 'Phú – quý', false), (q_id, 'Trời và đất', true), (q_id, 'Vua – dân', false);

    /* =====================================================
       10. ĐUA BÒ BẢY NÚI (festival_id = 10) - MEDIUM
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (10, 'Lễ hội Đua bò Bảy Núi gắn liền với lễ nào của người Khmer?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Ok Om Bok', false), (q_id, 'Chol Chnam Thmay', false), (q_id, 'Sen Dolta', true), (q_id, 'Kathina', false);

    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (10, 'Ban đầu, người Khmer đưa bò đến ruộng chùa để làm gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thi đấu', false), (q_id, 'Tập luyện', false), (q_id, 'Cày ruộng tích phước', true), (q_id, 'Mua bán', false);

    /* =====================================================
       11. NGHINH ÔNG (festival_id = 11) - MEDIUM
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (11, 'Tín ngưỡng thờ Cá Ông chịu ảnh hưởng từ văn hóa nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Hoa', false), (q_id, 'Khmer', false), (q_id, 'Chăm', true), (q_id, 'Nhật', false);

    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (11, 'Nghi lễ quan trọng nhất trong lễ Nghinh Ông là gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thả đèn trời', false), (q_id, 'Rước kiệu Nam Hải Tướng quân ra biển', true), (q_id, 'Đua thuyền', false), (q_id, 'Đốt pháo', false);

    /* =====================================================
       12. HOA TAM GIÁC MẠCH (festival_id = 12) - MEDIUM
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (12, 'Hoa tam giác mạch ban đầu là gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Cây cảnh', false), (q_id, 'Cây lương thực truyền thống', true), (q_id, 'Cây công nghiệp', false), (q_id, 'Cây thuốc', false);

    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (12, 'Một huyện trọng điểm thuộc khu vực tổ chức lễ hội là?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Sa Pa', false), (q_id, 'Mèo Vạc', true), (q_id, 'Mộc Châu', false), (q_id, 'Bắc Hà', false);

    /* =====================================================
       13. LỄ HỘI KATE (festival_id = 13) - MEDIUM
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (13, 'Lễ hội Katê chịu ảnh hưởng mạnh từ tôn giáo nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Nho giáo và Phật giáo', false), (q_id, 'Ấn Độ giáo và Hồi giáo', true), (q_id, 'Thiên Chúa giáo và Tin Lành', false), (q_id, 'Đạo Mẫu', false);

    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (13, 'Ý nghĩa lớn nhất của lễ hội Katê là gì?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Mừng năm mới', false), (q_id, 'Cầu mưa thuận gió hòa', false), (q_id, 'Tưởng nhớ và tri ân tổ tiên, thần linh', true), (q_id, 'Tổ chức thi đấu thể thao', false);

    /* =====================================================
       14. OK OM BOK (festival_id = 14) - MEDIUM
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (14, 'Mục đích chính của lễ hội Ok Om Bok là:', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Mừng năm mới', false), (q_id, 'Tạ ơn mùa màng bội thu', true), (q_id, 'Thi đấu thể thao', false), (q_id, 'Tôn vinh anh hùng dân tộc', false);

    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (14, 'Lễ hội Ok Om Bok phản ánh mối quan hệ giữa con người và:', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Kinh tế', false), (q_id, 'Chính trị', false), (q_id, 'Thiên nhiên', true), (q_id, 'Khoa học', false);

    /* =====================================================
       15. MỪNG LÚA MỚI (festival_id = 15) - MEDIUM
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (15, 'Hành động rước hồn lúa thể hiện quan niệm gì của người Êđê?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Duy vật', false), (q_id, 'Vạn vật hữu linh', true), (q_id, 'Hiện đại hóa', false), (q_id, 'Công nghiệp hóa', false);

    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (15, 'Giá trị xã hội nổi bật của lễ hội Mừng lúa mới là:', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Cạnh tranh', false), (q_id, 'Gắn kết gia đình, cộng đồng', true), (q_id, 'Phân chia giai cấp', false), (q_id, 'Đô thị hóa', false);

    /* =====================================================
       16. CỒNG CHIÊNG TÂY NGUYÊN (festival_id = 16) - MEDIUM
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (16, 'Lễ hội Cồng Chiêng Tây Nguyên quy tụ đối tượng chính nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Doanh nhân', false), (q_id, 'Nghệ nhân các tỉnh Tây Nguyên', true), (q_id, 'Vận động viên', false), (q_id, 'Chính trị gia', false);

    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (16, 'Ngoài trình diễn cồng chiêng, lễ hội còn có hoạt động văn hóa đặc trưng nào?', 'MEDIUM', 20) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Múa xoang', true), (q_id, 'Thi bơi', false), (q_id, 'Đấu vật', false), (q_id, 'Thi viết', false);

END $$;

DO $$ 
DECLARE 
    q_id INT;
BEGIN
    /* =====================================================
       1. HỘI GIÓNG (festival_id = 1) - MỨC ĐỘ KHÓ
       ===================================================== */
    
    -- Câu 31
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng Phù Đổng (Gia Lâm) có ý nghĩa gì đặc biệt?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Nơi thờ các vua Hùng', false), (q_id, 'Quê hương của Thánh Gióng, tái hiện các chặng đường đánh giặc', true), (q_id, 'Trung tâm buôn bán thời cổ', false), (q_id, 'Nơi tổ chức hội chợ mùa xuân', false);

    -- Câu 32
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng được UNESCO công nhận là gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Di sản thiên nhiên thế giới', false), (q_id, 'Di tích lịch sử quốc gia đặc biệt', false), (q_id, 'Di sản văn hóa vật thể của nhân loại', false), (q_id, 'Di sản văn hóa phi vật thể của nhân loại', true);

    -- Câu 33
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng là lễ hội đầu tiên của Việt Nam được UNESCO công nhận điều gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Di sản thiên nhiên', false), (q_id, 'Di sản kiến trúc', false), (q_id, 'Di sản văn hóa phi vật thể của nhân loại', true), (q_id, 'Kỳ quan thế giới', false);

    -- Câu 34
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng phản ánh rõ nhất giai đoạn nào của dân tộc?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thời hiện đại', false), (q_id, 'Thời kỳ sơ khai dựng nước', true), (q_id, 'Thời phong kiến muộn', false), (q_id, 'Thời thuộc địa', false);

    -- Câu 35
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Tín ngưỡng thờ Thánh Gióng thuộc loại hình nào?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thờ thần tự nhiên', false), (q_id, 'Thờ anh hùng dân tộc', true), (q_id, 'Thờ tổ nghề', false), (q_id, 'Thờ thần tài', false);

    -- Câu 36
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Sự khác biệt chính giữa Hội Gióng đền Sóc và Hội Gióng Phù Đổng là gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Một nơi gắn với quê hương, một nơi gắn với sự bay về trời', true), (q_id, 'Một ở miền Trung, một ở miền Nam', false), (q_id, 'Một tổ chức mùa đông, một mùa hè', false), (q_id, 'Không có khác biệt', false);

    -- Câu 37
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Giá trị tinh thần của Hội Gióng góp phần củng cố điều gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Ý thức cá nhân', false), (q_id, 'Ý thức cộng đồng', true), (q_id, 'Lợi ích kinh tế', false), (q_id, 'Hoạt động thương mại', false);

    -- Câu 38
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng thể hiện rõ mối quan hệ giữa yếu tố nào?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Kinh tế và chính trị', false), (q_id, 'Tín ngưỡng và lịch sử', true), (q_id, 'Du lịch và thương mại', false), (q_id, 'Thể thao và giải trí', false);

    -- Câu 39
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Việc UNESCO công nhận Hội Gióng có ý nghĩa gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tăng thu ngân sách', false), (q_id, 'Khẳng định giá trị toàn cầu của di sản', true), (q_id, 'Mở rộng thương mại', false), (q_id, 'Phát triển công nghiệp', false);

    -- Câu 40
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Tinh thần quật cường trong Hội Gióng được thể hiện qua hình tượng nào?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Lễ rước kiệu', false), (q_id, 'Hình tượng Thánh Gióng đánh giặc', true), (q_id, 'Hoạt động vui chơi', false), (q_id, 'Hội chợ', false);

    -- Câu 41
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Yếu tố nào giúp Hội Gióng được bảo tồn qua nhiều thế hệ?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Lợi nhuận cao', false), (q_id, 'Sự tham gia của cộng đồng', true), (q_id, 'Tài trợ quốc tế', false), (q_id, 'Hoạt động thương mại', false);

    -- Câu 42
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng góp phần giáo dục thế hệ trẻ về điều gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Kỹ năng kinh doanh', false), (q_id, 'Lòng yêu nước và truyền thống dân tộc', true), (q_id, 'Công nghệ hiện đại', false), (q_id, 'Nghệ thuật đương đại', false);

    -- Câu 43
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Nghi thức tế lễ trong Hội Gióng thể hiện yếu tố gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tính giải trí', false), (q_id, 'Tính thiêng liêng', true), (q_id, 'Tính cạnh tranh', false), (q_id, 'Tính thương mại', false);

    -- Câu 44
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Hội Gióng là minh chứng cho sự kết hợp giữa yếu tố nào?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Truyền thuyết và nghi lễ dân gian', true), (q_id, 'Thể thao và du lịch', false), (q_id, 'Công nghiệp và nông nghiệp', false), (q_id, 'Kinh tế và chính trị', false);

    -- Câu 45
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (1, 'Giá trị cốt lõi của Hội Gióng đối với bản sắc Việt Nam là gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Phát triển kinh tế', false), (q_id, 'Bảo tồn văn hóa và tinh thần dân tộc', true), (q_id, 'Thu hút đầu tư', false), (q_id, 'Quảng bá thương hiệu', false);

    /* =====================================================
       2. HỘI LIM BẮC NINH (festival_id = 2) - MỨC ĐỘ KHÓ
       ===================================================== */

    -- Câu 31
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hội Lim phản ánh rõ nhất mối quan hệ giữa yếu tố nào?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Chính trị và quân sự', false), (q_id, 'Tín ngưỡng và văn hóa dân gian', true), (q_id, 'Kinh tế và thương mại', false), (q_id, 'Công nghiệp và đô thị hóa', false);

    -- Câu 32
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Giá trị cốt lõi của Hội Lim nằm ở điều gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Lợi ích kinh tế', false), (q_id, 'Hoạt động vui chơi', false), (q_id, 'Bảo tồn di sản tinh thần', true), (q_id, 'Quảng bá du lịch', false);

    -- Câu 33
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Ý nghĩa của tiếng hát trong Hội Lim thể hiện điều gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Sức mạnh quân sự', false), (q_id, 'Tính cạnh tranh', false), (q_id, 'Giá trị vật chất', false), (q_id, 'Đời sống tình cảm và giao duyên', true);

    -- Câu 34
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Việc UNESCO công nhận Quan họ Bắc Ninh có ý nghĩa gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Khẳng định giá trị toàn cầu của di sản', true), (q_id, 'Tăng doanh thu du lịch', false), (q_id, 'Mở rộng thương mại', false), (q_id, 'Phát triển công nghiệp', false);

    -- Câu 35
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hội Lim góp phần giáo dục thế hệ trẻ về điều gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Kỹ năng kinh doanh', false), (q_id, 'Tinh thần yêu nước', false), (q_id, 'Ý thức bảo tồn văn hóa', true), (q_id, 'Công nghệ hiện đại', false);

    -- Câu 36
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hội Lim là minh chứng cho điều gì trong văn hóa Việt?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Sự phát triển công nghiệp', false), (q_id, 'Sự gắn kết cộng đồng qua nghệ thuật dân gian', true), (q_id, 'Hoạt động quân sự', false), (q_id, 'Sự cạnh tranh thương mại', false);

    -- Câu 37
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Tính chất đầu xuân của Hội Lim gắn với mong ước nào?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Chiến thắng quân sự', false), (q_id, 'Thăng tiến quan chức', false), (q_id, 'Bình an và mùa màng tốt tươi', true), (q_id, 'Mở rộng lãnh thổ', false);

    -- Câu 38
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hội Lim đóng vai trò gì trong không gian văn hóa Kinh Bắc?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Trung tâm hành chính', false), (q_id, 'Di tích quân sự', false), (q_id, 'Trung tâm thương mại', false), (q_id, 'Biểu tượng văn hóa nghệ thuật', true);

    -- Câu 39
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Quan họ tại Hội Lim mang đậm yếu tố nào?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Giao duyên ứng đối', true), (q_id, 'Thi đấu chuyên nghiệp', false), (q_id, 'Trình diễn sân khấu hóa', false), (q_id, 'Biểu diễn hiện đại', false);

    -- Câu 40
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hội Lim góp phần duy trì điều gì bền vững nhất?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Giá trị vật chất', false), (q_id, 'Di sản văn hóa phi vật thể', true), (q_id, 'Hệ thống thương mại', false), (q_id, 'Công nghiệp hóa', false);

    -- Câu 41
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Không gian hát Quan họ trên sông Tiêu mang ý nghĩa gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Trang trí', false), (q_id, 'Thương mại', false), (q_id, 'Biểu tượng văn hóa giao duyên', true), (q_id, 'Thi đấu', false);

    -- Câu 42
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hội Lim phản ánh đặc trưng nào của cư dân Kinh Bắc?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tính võ biền', false), (q_id, 'Tình cảm, tinh tế trong giao tiếp', true), (q_id, 'Tính cạnh tranh', false), (q_id, 'Tính thương mại', false);

    -- Câu 43
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Việc khôi phục Hội Lim sau chiến tranh thể hiện điều gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Nhu cầu kinh tế', false), (q_id, 'Mong muốn giải trí', false), (q_id, 'Ý thức bảo tồn truyền thống', true), (q_id, 'Phát triển du lịch', false);

    -- Câu 44
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Hội Lim là sự kết hợp hài hòa giữa yếu tố nào?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thể thao và thương mại', false), (q_id, 'Chính trị và quân sự', false), (q_id, 'Công nghiệp và đô thị', false), (q_id, 'Lễ nghi và sinh hoạt dân gian', true);

    -- Câu 45
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (2, 'Giá trị bền vững nhất mà Hội Lim mang lại là gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Doanh thu du lịch', false), (q_id, 'Phát triển hạ tầng', false), (q_id, 'Thu hút đầu tư', false), (q_id, 'Gìn giữ bản sắc văn hóa dân tộc', true);

END $$;

DO $$ 
DECLARE 
    q_id INT;
BEGIN
    /* =====================================================
       3. LỄ KHAO LỀ THẾ LÍNH (festival_id = 3) - HARD
       ===================================================== */
    
    -- Câu 14 (Số thứ tự theo dữ liệu bạn gửi)
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Nghi thức mang ý nghĩa tưởng niệm sâu sắc nhất trong lễ hội Khao lề Thế lính là gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Đua thuyền Tứ Linh', false), (q_id, 'Hát bội truyền thống', false), (q_id, 'Thả thuyền mô hình ra biển', true), (q_id, 'Múa lân – múa sư tử', false);

    -- Câu 15
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Lễ Khao lề Thế lính Hoàng Sa được công nhận là Di sản Văn hóa Phi vật thể quốc gia vào năm nào?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, '2009', false), (q_id, '2010', false), (q_id, '2013', true), (q_id, '2015', false);

    -- Câu 31
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Lễ Khao lề Thế lính Hoàng Sa phản ánh điều gì rõ nét nhất?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Truyền thống bảo vệ chủ quyền biển đảo', true), (q_id, 'Phát triển thương mại', false), (q_id, 'Hoạt động quân sự hiện đại', false), (q_id, 'Du lịch biển', false);

    -- Câu 34
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Đội Hoàng Sa trong lịch sử ra đi thực hiện nhiệm vụ trong điều kiện nào?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thuận lợi hoàn toàn', false), (q_id, 'Được bảo vệ an toàn', false), (q_id, 'Có tàu hiện đại', false), (q_id, 'Hiểm nguy trên biển', true);

    -- Câu 44
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (3, 'Ý nghĩa sâu xa của cụm từ “thế lính” trong tên lễ hội là gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thay thế và tri ân người đã khuất', true), (q_id, 'Thi đấu', false), (q_id, 'Buôn bán', false), (q_id, 'Trang trí', false);

    /* =====================================================
       4. LỄ HỘI XUÂN YÊN TỬ (festival_id = 4) - HARD
       ===================================================== */

    -- Câu 19
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Triết lý nổi bật được thể hiện qua lễ hội xuân Yên Tử là gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tu hành tách biệt khỏi đời sống', false), (q_id, 'Tu trong đời, hài hòa giữa đạo và đời', true), (q_id, 'Đề cao võ học và binh pháp', false), (q_id, 'Sống khổ hạnh để giác ngộ', false);

    -- Câu 20
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Hoạt động hành hương nào sau đây là một phần quan trọng nhất của lễ hội xuân Yên Tử?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Đua thuyền trên sông', false), (q_id, 'Hát Quan họ giao duyên', false), (q_id, 'Hành hương lên chùa Đồng', true), (q_id, 'Thả đèn hoa đăng trên biển', false);

    /* =====================================================
       5. KỲ YÊN HẠ ĐIỀN (festival_id = 5) - HARD
       ===================================================== */

    -- Câu 33
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (5, 'Ý nghĩa sâu sắc nhất của lễ hội Kỳ Yên Hạ Điền đối với cộng đồng Nam Bộ là gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tăng doanh thu du lịch địa phương', false), (q_id, 'Giữ gìn truyền thống uống nước nhớ nguồn và gắn kết cộng đồng', true), (q_id, 'Quảng bá sản phẩm nông nghiệp', false), (q_id, 'Tổ chức biểu diễn nghệ thuật hiện đại', false);

    -- Câu phụ (Đặc trưng)
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (5, 'Việc duy trì lễ hội Kỳ Yên Hạ Điền trong xã hội hiện đại phản ánh xu hướng nào?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thay thế hoàn toàn nông nghiệp bằng công nghiệp', false), (q_id, 'Chuyển sang hình thức giải trí thuần túy', false), (q_id, 'Loại bỏ tín ngưỡng dân gian', false), (q_id, 'Bảo tồn giá trị tinh thần song song với phát triển kinh tế', true);

    /* =====================================================
       6. HỘI ĐUA VOI BUÔN ĐÔN (festival_id = 6) - HARD
       ===================================================== */

    -- Câu 35
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (6, 'Từ góc nhìn văn hóa – môi trường, thách thức lớn nhất khi duy trì Hội Đua Voi Buôn Đôn hiện nay là gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thi thiếu khách du lịch', false), (q_id, 'Mất hoàn toàn truyền thống cưỡi voi', false), (q_id, 'Cân bằng giữa bảo tồn văn hóa và bảo vệ động vật hoang dã', true), (q_id, 'Thiếu người điều khiển voi chuyên nghiệp', false);

    -- Câu 36
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (6, 'Yếu tố cốt lõi nào khiến Hội Đua Voi Buôn Đôn không chỉ đơn thuần là một cuộc thi?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Gắn với nghi lễ và đời sống cộng đồng', true), (q_id, 'Có đông khán giả', false), (q_id, 'Có tính cạnh tranh', false), (q_id, 'Có giải thưởng', false);

    -- Câu phụ (Mối quan hệ)
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (6, 'Trong hội đua voi, mối quan hệ giữa người và voi thể hiện bản sắc gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Sự khai thác thuần túy', false), (q_id, 'Hoạt động thương mại', false), (q_id, 'Cạnh tranh giữa các tộc người', false), (q_id, 'Quan hệ hợp tác gắn bó lâu đời', true);

END $$;

DO $$ 
DECLARE 
    q_id INT;
BEGIN
    /* =====================================================
       4. LỄ HỘI XUÂN YÊN TỬ (festival_id = 4) - HARD
       ===================================================== */
    -- Câu 31
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Tinh thần nhập thế của Phật giáo Việt Nam thể hiện điều gì qua lễ hội Yên Tử?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tách rời đời sống', false), (q_id, 'Hòa mình vào đời để tu tập', true), (q_id, 'Tập trung kinh tế', false), (q_id, 'Chinh phục tự nhiên', false);

    -- Câu 33
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Việc UNESCO công nhận quần thể Yên Tử có ý nghĩa quan trọng nhất là gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tăng doanh thu du lịch', false), (q_id, 'Khẳng định giá trị toàn cầu của di sản', true), (q_id, 'Mở rộng thương mại', false), (q_id, 'Phát triển công nghiệp', false);

    -- Câu 36
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Thiền phái Trúc Lâm do Phật hoàng Trần Nhân Tông sáng lập mang đặc trưng nổi bật nào?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tách biệt xã hội', false), (q_id, 'Đậm bản sắc dân tộc', true), (q_id, 'Phụ thuộc yếu tố nước ngoài', false), (q_id, 'Thiên về mục đích chính trị', false);

    -- Câu 41
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (4, 'Ý nghĩa sâu xa của triết lý “tu trong đời” tại Yên Tử là gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Rời bỏ hoàn toàn xã hội', false), (q_id, 'Tu tập gắn với trách nhiệm xã hội', true), (q_id, 'Ẩn cư nơi thâm sơn', false), (q_id, 'Tách biệt với cộng đồng', false);

    /* =====================================================
       7. LỄ HỘI ĐỀN HÙNG (festival_id = 7) - HARD
       ===================================================== */
    -- Câu 37
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (7, 'Điểm làm nên tính “quốc gia” đặc sắc nhất của tín ngưỡng thờ cúng Hùng Vương là gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Chỉ diễn ra ở một địa phương duy nhất', false), (q_id, 'Gắn với truyền thuyết về nguồn gốc chung của dân tộc', true), (q_id, 'Phục vụ mục đích thương mại', false), (q_id, 'Chỉ dành cho tầng lớp quý tộc xưa', false);

    -- Câu (Bổ sung ý nghĩa vượt trội)
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (7, 'So với các lễ hội mang tính vùng miền, Lễ hội Đền Hùng có ý nghĩa vượt trội nào?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Mang tính biểu tượng về cội nguồn và ý thức dân tộc', true), (q_id, 'Có quy mô tổ chức lớn nhất', false), (q_id, 'Có nhiều trò chơi dân gian nhất', false), (q_id, 'Có giá trị kinh tế cao nhất', false);

    -- Câu (Giá trị cốt lõi)
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (7, 'Ý nghĩa sâu xa nhất của tín ngưỡng thờ cúng Hùng Vương đối với Việt Nam là gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tôn vinh cá nhân một anh hùng cụ thể', false), (q_id, 'Khẳng định quyền lực địa phương', false), (q_id, 'Củng cố bản sắc và sự tiếp nối lịch sử dân tộc', true), (q_id, 'Phát triển kinh tế vùng Đất Tổ', false);


    /* =====================================================
       8. LỄ HỘI BÁNH DÂN GIAN NAM BỘ (festival_id = 8) - HARD
       ===================================================== */
    -- Câu 39
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (8, 'Nếu lễ hội bánh chỉ chú trọng thương mại hóa mà thiếu yếu tố văn hóa, hệ quả tiêu cực nhất là gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tăng giá trị truyền thống', false), (q_id, 'Làm mờ bản sắc và giảm ý nghĩa di sản', true), (q_id, 'Thu hút nhiều nghệ nhân hơn', false), (q_id, 'Tăng sự gắn kết cộng đồng', false);

    -- Câu 40
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (8, 'Trong bối cảnh toàn cầu hóa ẩm thực, việc tổ chức Lễ hội Bánh Dân Gian Nam Bộ giúp ích gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thay thế hoàn toàn món ăn truyền thống', false), (q_id, 'Đồng hóa ẩm thực Nam Bộ với quốc tế', false), (q_id, 'Khẳng định bản sắc ẩm thực địa phương trước sự giao thoa văn hóa', true), (q_id, 'Giảm sự đa dạng của món ăn', false);

    -- Câu (Vai trò nghệ nhân)
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (8, 'Việc nhiều nghệ nhân cao tuổi tham gia lễ hội cho thấy điều gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Vai trò của truyền nhân trong duy trì tri thức dân gian', true), (q_id, 'Sự đứt gãy giữa các thế hệ', false), (q_id, 'Xu hướng thương mại hóa nghề truyền thống', false), (q_id, 'Sự phụ thuộc vào quảng bá truyền thông', false);

END $$;

DO $$ 
DECLARE 
    q_id INT;
BEGIN
    /* =====================================================
       9. TẾT TRUNG THU (festival_id = 9) - HARD
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (9, 'Dấu tích về lễ hội trăng (tiền thân Trung Thu) được tìm thấy trên hiện vật nào?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Trống đồng Đông Sơn', false), (q_id, 'Trống đồng Ngọc Lũ', true), (q_id, 'Thạp đồng', false), (q_id, 'Chuông đồng', false);

    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (9, 'Dưới thời nhà Lý, Tết Trung Thu đã trở thành hoạt động gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Lễ gia đình', false), (q_id, 'Ngày hội chính thức trong triều đình', true), (q_id, 'Lễ cúng nông nghiệp', false), (q_id, 'Lễ quân đội', false);

    /* =====================================================
       10. ĐUA BÒ BẢY NÚI (festival_id = 10) - HARD
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (10, 'Lễ hội Đua bò Bảy Núi được công nhận Di sản văn hóa phi vật thể quốc gia vào năm nào?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, '2014', false), (q_id, '2015', false), (q_id, '2016', true), (q_id, '2018', false);

    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (10, 'Địa danh "Bảy Núi" gắn liền với lễ hội này còn được gọi là gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thất Sơn', false), (q_id, 'Thất Sơn (vùng Bảy Núi)', true), (q_id, 'Cửu Sơn', false), (q_id, 'Ngũ Sơn', false);

    /* =====================================================
       11. NGHINH ÔNG (festival_id = 11) - HARD
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (11, 'Trong tâm thức ngư dân, hình tượng “Đức ngài Cá Ông” biểu tượng cho điều gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Quyền lực', false), (q_id, 'Tài lộc', false), (q_id, 'Lòng hy sinh và niềm tin của ngư dân', true), (q_id, 'Sức mạnh quân sự', false);

    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (11, 'Giá trị văn hóa lớn nhất mà lễ hội Nghinh Ông mang lại là:', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Phát triển du lịch', false), (q_id, 'Bảo tồn tín ngưỡng và bản sắc vùng biển', true), (q_id, 'Lợi ích kinh tế', false), (q_id, 'Hoạt động thể thao', false);

    /* =====================================================
       12. HOA TAM GIÁC MẠCH (festival_id = 12) - HARD
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (12, 'Một không gian văn hóa cổ kính, nổi bật thường diễn ra các hoạt động lễ hội là?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Phố cổ Hội An', false), (q_id, 'Phố cổ Đồng Văn', true), (q_id, 'Phố cổ Hà Nội', false), (q_id, 'Phố cổ Huế', false);

    /* =====================================================
       13. LỄ HỘI KATE (festival_id = 13) - HARD
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (13, 'Sự giao thoa tín ngưỡng trong lễ hội Katê phản ánh điều gì về tiến trình lịch sử người Chăm?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Sự biệt lập văn hóa', false), (q_id, 'Sự ảnh hưởng và tiếp biến văn hóa qua thời gian', true), (q_id, 'Sự suy tàn văn hóa', false), (q_id, 'Sự thay đổi ngôn ngữ', false);

    /* =====================================================
       14. OK OM BOK (festival_id = 14) - HARD
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (14, 'Nghi thức tạ ơn Mặt Trăng trong Ok Om Bok thể hiện quan niệm gì của người Khmer?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Duy vật biện chứng', false), (q_id, 'Vạn vật hữu linh', true), (q_id, 'Công nghiệp hóa', false), (q_id, 'Hiện đại hóa', false);

    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (14, 'Giá trị cốt lõi mang tính nhân văn sâu sắc nhất của Ok Om Bok là:', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Tinh thần thương mại', false), (q_id, 'Lòng biết ơn và tôn kính thiên nhiên', true), (q_id, 'Hoạt động giải trí', false), (q_id, 'Tính cạnh tranh', false);

    /* =====================================================
       15. MỪNG LÚA MỚI (festival_id = 15) - HARD
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (15, 'Lễ hội Mừng lúa mới Êđê thể hiện mối quan hệ nào là trung tâm?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Người – Nhà nước', false), (q_id, 'Người – Thiên nhiên – Thần linh', true), (q_id, 'Người – Doanh nghiệp', false), (q_id, 'Người – Công nghệ', false);

    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (15, 'Lễ hội Mừng lúa mới của người Êđê là biểu hiện đặc trưng của:', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Văn hóa du mục', false), (q_id, 'Văn hóa nông nghiệp lúa rẫy', true), (q_id, 'Văn hóa biển', false), (q_id, 'Văn hóa công nghiệp', false);

    /* =====================================================
       16. CỒNG CHIÊNG TÂY NGUYÊN (festival_id = 16) - HARD
       ===================================================== */
    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (16, 'Việc UNESCO ghi danh Không gian văn hóa Cồng chiêng Tây Nguyên mang ý nghĩa gì?', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Thương mại hóa di sản', false), (q_id, 'Công nhận giá trị toàn cầu của di sản', true), (q_id, 'Thay đổi bản sắc gốc', false), (q_id, 'Xóa bỏ truyền thống cổ', false);

    INSERT INTO quiz_questions (festival_id, content, difficulty, points_per_question) 
    VALUES (16, 'Giá trị cốt lõi bền vững nhất của lễ hội Cồng chiêng Tây Nguyên là:', 'HARD', 30) RETURNING question_id INTO q_id;
    INSERT INTO quiz_answers (question_id, content, is_correct) VALUES 
    (q_id, 'Biểu diễn nghệ thuật hiện đại', false), (q_id, 'Bảo tồn và phát huy di sản văn hóa', true), (q_id, 'Tăng trưởng kinh tế vùng', false), (q_id, 'Hoạt động giải trí', false);

END $$;