export type CaseStudy = {
  id: string;
  num: string;
  tag: string;
  title: string;
  subtitle: string;
  role: string;
  company: string;
  year: string;
  image: string;
  imageAlt: string;
  metrics: { value: string; label: string }[];
  sections: {
    label: string;
    title: string;
    body: string;
  }[];
  result: string;
  highlight?: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "lynk-co",
    num: "01",
    tag: "Proposal hợp tác thương hiệu",
    title: "Lynk & Co 08 EM-P × Car Awards 2025",
    subtitle: "Xây proposal mời thương hiệu đồng hành cùng giải thưởng xe năm",
    role: "Planning Intern — xây dựng nội dung và kế hoạch tổng thể",
    company: "FPT Online",
    year: "2025",
    image: "/images/case-studies/lynk-co.jpg",
    imageAlt:
      "Mẫu xe Lynk & Co 08 EM-P — minh hoạ cho case Lynk & Co × Car Awards 2025",
    metrics: [
      { value: "~1 tỷ", label: "Ngân sách dự kiến" },
      { value: "4 ngày", label: "Deadline chào file" },
      { value: "24.7M", label: "Users chuyên mục Xe" },
      { value: "67.6%", label: "Tỉ lệ nam độc giả" },
    ],
    sections: [
      {
        label: "Đề bài",
        title: "Mời Lynk & Co đồng hành cùng Car Awards 2025",
        body: "Tháng 5/2025, mình nhận brief từ leader: xây proposal mời Lynk & Co đồng hành cùng Car Awards 2025 nhân dịp ra mắt mẫu 08 EM-P. Ngân sách khoảng 1 tỷ, xe ra mắt tháng 7-8/2025, deadline hoàn thành file chào trong 4 ngày, phối hợp song song với team VBrand và team Event.",
      },
      {
        label: "Thử thách thật sự",
        title: "Bài toán thật nằm ở định kiến xuất xứ",
        body: "Brief chỉ ra hai điểm nghẽn — Lynk & Co là thương hiệu gốc Trung Quốc với mức giá cao, trong khi người mua xe Việt vốn nhạy cảm với xuất xứ ở phân khúc này. Mình nhận ra nếu chỉ chào gói truyền thông thông thường, proposal sẽ không chạm được nỗi lo thật của khách hàng.",
      },
      {
        label: "Cách mình giải",
        title: "Xoay quanh chữ \"bảo chứng\"",
        body: "Mình xây toàn bộ proposal xoay quanh chữ \"bảo chứng\": thay vì để brand tự nói về mình, hãy để chuyên gia và trải nghiệm thực tế nói thay — Car Test với hội đồng giám khảo, Car Insights dạng vodcast với lãnh đạo hãng, Driving Day cho người dùng lái thử trực tiếp. Về mặt kênh, mình dùng số liệu Google Analytics của chuyên mục Xe VnExpress (24,7M users, 67,6% nam, tệp có khả năng chi trả tốt) để chứng minh đây là đúng nơi tệp khách hàng mục tiêu đang hiện diện.",
      },
      {
        label: "Điều mình học được",
        title: "Khách hàng phải thấy chính mình trong proposal",
        body: "Bản nháp đầu tiên của mình bị nhận xét là roadmap thiếu logic thời gian và chưa làm rõ quyền lợi khách hàng nhận được. Mình dựng lại timeline theo ba giai đoạn Awareness → Raise Awareness → Engagement bám theo mốc ra mắt xe, và tách riêng phần quyền lợi thành bảng chi tiết từng hạng mục. Bài học lớn nhất: proposal không phải để khoe chương trình của mình, mà để khách hàng nhìn thấy chính họ trong đó.",
      },
    ],
    result:
      "Proposal được brand ghi nhận, và mình được tham gia buổi pitching trực tiếp với đại diện nhãn hàng — lần đầu tiên mình quan sát cách một planner senior dẫn dắt cuộc trao đổi từ chính tài liệu mình góp phần xây dựng.",
    highlight: "Pitching trực tiếp với nhãn hàng",
  },
  {
    id: "toshiba",
    num: "02",
    tag: "Proposal hợp tác thương hiệu",
    title: "Toshiba × Tech Awards 2025",
    subtitle: "Tìm vị trí mà thương hiệu ngồi vào vừa vặn nhất trong giải thưởng",
    role: "Planning Intern — nghiên cứu và xây dựng đề xuất",
    company: "FPT Online",
    year: "2025",
    image: "/images/case-studies/toshiba.jpg",
    imageAlt:
      "Sản phẩm gia dụng Toshiba — minh hoạ cho case Toshiba × Tech Awards 2025",
    metrics: [
      { value: "3", label: "Nhóm hạng mục giải" },
      { value: "2", label: "Sản phẩm đề cử" },
      { value: "Sức khỏe", label: "Nhóm máy lọc nước" },
      { value: "Tổ ấm", label: "Nhóm máy rửa chén" },
    ],
    sections: [
      {
        label: "Đề bài",
        title: "Mời Toshiba đồng hành cùng Tech Awards 2025",
        body: "Song song với các case ô tô, mình được giao xây proposal mời Toshiba đồng hành cùng Tech Awards 2025 — giải thưởng công nghệ thường niên do VnExpress tổ chức. Khác với Car Awards, đây là bài toán ngành hàng gia dụng: Toshiba có danh mục sản phẩm rộng, và câu hỏi đầu tiên mình phải trả lời là chọn sản phẩm nào để đưa vào chương trình, và đặt nó ở đâu.",
      },
      {
        label: "Thử thách thật sự",
        title: "Tránh bẫy \"liệt kê quyền lợi\"",
        body: "Một proposal tài trợ rất dễ rơi vào bẫy \"liệt kê quyền lợi\" — banner bao nhiêu tuần, bài PR bao nhiêu bài. Nhưng nếu chỉ có vậy, Toshiba không có lý do gì để chọn Tech Awards thay vì một kênh quảng cáo thông thường. Mình cần tìm ra điểm khớp tự nhiên giữa sản phẩm của họ và cấu trúc giải thưởng.",
      },
      {
        label: "Cách mình giải",
        title: "Đặt sản phẩm vào đúng hạng mục vinh danh",
        body: "Mình nghiên cứu kỹ cơ cấu hạng mục mới của \"Sản phẩm tôi yêu 2025\" — năm nay chia làm ba nhóm: Công nghệ cho tổ ấm, Công nghệ cho hành tinh xanh, và Công nghệ cho sức khỏe. Từ đó mình đề xuất đưa máy lọc nước vào nhóm Sức khỏe (hạng mục \"Máy lọc nước có công nghệ mới ấn tượng nhất\") và máy rửa chén vào nhóm Tổ ấm (hạng mục \"Máy rửa chén cao cấp được yêu thích\"). Cách đặt này giúp sản phẩm xuất hiện như một đề cử được vinh danh chứ không phải một quảng cáo — người đọc tiếp nhận với tâm thế hoàn toàn khác. Phần quyền lợi, mình rút kinh nghiệm từ feedback ở case trước: tách bạch từng hạng mục thành bảng chi tiết (banner, tin bài, social, gói bình chọn) kèm chỉ số dự kiến cụ thể, để khách hàng thấy ngay mình bỏ ra bao nhiêu và nhận về những gì.",
      },
      {
        label: "Điều mình học được",
        title: "Insight đôi khi là ghép đúng hai mảnh ghép có sẵn",
        body: "Case này dạy mình rằng công việc của planner đôi khi không phải nghĩ ra ý tưởng mới, mà là đọc thật kỹ những gì đang có sẵn — cấu trúc chương trình, hạng mục giải, hành vi độc giả — để tìm vị trí mà thương hiệu ngồi vào vừa vặn nhất. Insight không phải lúc nào cũng đến từ điều gì bay bổng; nhiều khi nó nằm trong việc ghép đúng hai mảnh ghép có sẵn lại với nhau.",
      },
    ],
    result:
      "Proposal được brand ghi nhận và mình tiếp tục được tham gia quá trình trao đổi trực tiếp với đại diện nhãn hàng.",
    highlight: "Sản phẩm thành đề cử được vinh danh",
  },
  {
    id: "inblue",
    num: "03",
    tag: "Dự án khởi nghiệp — môn học",
    title: "InBlue: Nền tảng luyện phỏng vấn cùng AI",
    subtitle: "Từ nghiên cứu thị trường đến 19 khách hàng trả phí đầu tiên",
    role: "Marketing & Sales — nghiên cứu thị trường, định vị, thử nghiệm và bán hàng",
    company: "Khởi nghiệp — môn học",
    year: "2025",
    image: "/images/case-studies/inblue.jpg",
    imageAlt:
      "Nhóm InBlue tại booth giới thiệu sản phẩm ở FPT University — minh hoạ demo AI luyện phỏng vấn",
    metrics: [
      { value: "40", label: "Người dùng A/B test" },
      { value: "60%", label: "Phản hồi tiêu cực ban đầu" },
      { value: "1 tháng", label: "Thời gian điều chỉnh" },
      { value: "19", label: "Khách hàng trả phí đầu tiên" },
    ],
    sections: [
      {
        label: "Đề bài",
        title: "Lấp khoảng trống khâu chuẩn bị phỏng vấn",
        body: "Trong môn học Khởi nghiệp, nhóm mình xây dựng InBlue — nền tảng giúp sinh viên năm 3-4 và người đi làm 1-2 năm đầu luyện phỏng vấn với AI, kết hợp kết nối mentor thật để sửa CV, portfolio và chuẩn bị test đầu vào doanh nghiệp. Mình phụ trách marketing và sales: nghiên cứu thị trường, hành vi người dùng, đối thủ, và đưa sản phẩm ra thử nghiệm thực tế.",
      },
      {
        label: "Thử thách thật sự",
        title: "Đối thủ thật là thói quen dùng AI miễn phí",
        body: "Thị trường đã có TopCV, VietnamWorks giải quyết rất tốt khâu tìm việc, nhưng bỏ trống khâu chuẩn bị — ứng viên trẻ rớt phỏng vấn không phải vì thiếu tin tuyển dụng, mà vì thiếu nơi luyện tập có phản hồi. Đó là khoảng trống nhóm nhắm vào. Nhưng giả định là một chuyện, thị trường trả lời là chuyện khác. Nhóm chạy A/B testing với 40 người dùng trong giai đoạn thử nghiệm. Kết quả không như kỳ vọng: 60% phản hồi rằng giao diện và luồng thao tác thiếu linh hoạt. Đào sâu thêm, mình nhận ra hai vấn đề lớn hơn nằm ngoài sản phẩm: mức giá chào chưa đủ hấp dẫn với khách hàng cá nhân, và quan trọng nhất — người dùng chưa có lý do để tin tụi mình, khi họ hoàn toàn có thể nhờ các AI miễn phí tạo câu hỏi phỏng vấn. Nói cách khác, đối thủ thật của InBlue không phải TopCV, mà là thói quen \"tự xoay xở với AI miễn phí\".",
      },
      {
        label: "Cách nhóm phản ứng",
        title: "Sửa theo đúng những gì dữ liệu chỉ ra",
        body: "Thay vì bảo vệ sản phẩm, nhóm dành một tháng sửa theo đúng những gì dữ liệu chỉ ra — làm lại giao diện và luồng thao tác, điều chỉnh cách đóng gói giá, và định vị lại giá trị vào phần AI miễn phí không thay được: phản hồi có cấu trúc theo tiêu chí nhà tuyển dụng và lớp mentor thật phía sau.",
      },
      {
        label: "Điều mình học được",
        title: "Đọc phản hồi tiêu cực như dữ liệu, không phải thất bại",
        body: "Đây là dự án dạy mình nhiều nhất, chính vì nó không suôn sẻ. Mình học được rằng insight ban đầu đúng chưa đủ — cách đóng gói, mức giá và niềm tin quyết định người ta có trả tiền hay không. Và mình học được cách đọc phản hồi tiêu cực như dữ liệu thay vì như thất bại. Chính trải nghiệm ngồi phân tích 40 phản hồi để tìm ra vấn đề thật sự nằm ở đâu là lý do mình muốn theo đuổi Business Analytics một cách bài bản.",
      },
    ],
    result:
      "Sau một tháng điều chỉnh, InBlue có 19 khách hàng đầu tiên chấp nhận chi trả cho dịch vụ. Con số nhỏ, nhưng với mình nó là 19 lần thị trường xác nhận rằng khoảng trống nhóm tìm ra là có thật.",
    highlight: "19 lần thị trường xác nhận",
  },
];
