// 主题切换功能
function toggleTheme() {
    const isDark = document.body.dataset.theme === 'dark';
    document.body.dataset.theme = isDark ? 'light' : 'dark';
    
    // 切换主题图标
    const themeIcon = document.querySelector('.right-section .btn i');
    themeIcon.className = `fas fa-${isDark ? 'moon' : 'sun'}`;
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const openBtn = document.querySelector('.open-sidebar');
    const mainContent = document.querySelector('.main-content');
    
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('collapsed');
    openBtn.classList.toggle('visible', sidebar.classList.contains('collapsed'));
}

document.addEventListener('DOMContentLoaded', () => {
    // 检测设备类型并设置侧栏初始状态
    const isMobile = window.innerWidth <= 768;
    const sidebar = document.querySelector('.sidebar');
    const openBtn = document.querySelector('.open-sidebar');
    const mainContent = document.querySelector('.main-content');

    if (isMobile || window.innerWidth <= 1024) {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('collapsed');
        openBtn.classList.add('visible');
    }

    // 自动检测系统主题并设置初始图标
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.dataset.theme = prefersDark ? 'dark' : 'light';
    
    const themeIcon = document.querySelector('.right-section .btn i');  // 修改选择器
    if (themeIcon) {  // 添加空值检查
        themeIcon.className = `fas fa-${prefersDark ? 'sun' : 'moon'}`;
    }

    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', e => {
            document.body.dataset.theme = e.matches ? 'dark' : 'light';
        });

    // 添加选项卡切换功能
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            // 如果链接包含实际的 URL（子页面的返回链接），不阻止默认行为
            if (link.getAttribute('href').includes('.html')) {
                return;
            }
            
            e.preventDefault();
            const sectionId = link.dataset.section;
            
            // 更新导航激活状态
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // 切换内容区域
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // 添加窗口大小变化监听
    window.addEventListener('resize', () => {
        const currentWidth = window.innerWidth;
        const sidebar = document.querySelector('.sidebar');
        const openBtn = document.querySelector('.open-sidebar');
        const mainContent = document.querySelector('.main-content');

        if (currentWidth <= 768 || currentWidth <= 1024) {  // 移动端和平板端
            sidebar.classList.add('collapsed');
            mainContent.classList.add('collapsed');
            openBtn.classList.add('visible');
        } else {  // 桌面端
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('collapsed');
            openBtn.classList.remove('visible');
        }
    });

    // 初始检查屏幕宽度
    if (window.innerWidth <= 1024) {
        document.querySelector('.sidebar').classList.add('collapsed');
        document.querySelector('.main-content').classList.add('collapsed');
    }

    // 添加卡片展开功能
    document.querySelectorAll('.expand-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.expandable-card');
            card.classList.toggle('expanded');
            e.target.textContent = card.classList.contains('expanded') ? '收起' : '查看更多';
        });
    });

    // 添加折叠按钮文字切换功能
    document.querySelectorAll('.collapse').forEach(collapseElement => {
        collapseElement.addEventListener('show.bs.collapse', event => {
            const button = document.querySelector(`[data-bs-target="#${event.target.id}"]`);
            button.textContent = '折叠';
        });

        collapseElement.addEventListener('hide.bs.collapse', event => {
            const button = document.querySelector(`[data-bs-target="#${event.target.id}"]`);
            button.textContent = '展开';
        });
    });

    // 初始化时隐藏所有详情页
    const detailContainer = document.getElementById('teacherDetail');
    if (detailContainer) {
        detailContainer.classList.remove('active');
    }

    // 为所有活动图片添加点击事件，但排除展开按钮
    const activityImages = document.querySelectorAll('.activity-card, .additional-images img');
    activityImages.forEach(img => {
        img.classList.add('clickable-image');
        img.addEventListener('click', (e) => {
            // 如果点击的是展开按钮或者其内部元素，不触发预览
            if (e.target.closest('.collapse-toggle')) {
                return;
            }
            
            // 获取图片URL并打开预览
            const imageSrc = img.classList.contains('activity-card') 
                ? img.style.backgroundImage.replace(/url\(['"](.+)['"]\)/, '$1')
                : img.src;
            openImagePreview(imageSrc);
            e.stopPropagation(); // 防止事件冒泡
        });
    });

    // 阻止预览图片的点击事件冒泡
    document.getElementById('previewImage').addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // ESC键关闭预览
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeImagePreview();
        }
    });

    // 为所有导航链接添加点击事件
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            // 检查是否是移动端（屏幕宽度小于1024px）
            if (window.innerWidth <= 1024) {
                // 触发侧栏收起
                const sidebar = document.querySelector('.sidebar');
                const openButton = document.querySelector('.open-sidebar');
                sidebar.classList.add('collapsed');
                openButton.style.display = 'flex';
            }
        });
    });

    // 添加气泡显示逻辑
    const tooltip = document.querySelector('.tooltip-bubble');
    let tooltipTimeout;

    function showTooltip() {
        if (window.innerWidth <= 1024) {
            tooltip.classList.add('show');
            // 3秒后自动隐藏
            tooltipTimeout = setTimeout(() => {
                tooltip.classList.remove('show');
            }, 3000);
        }
    }

    function hideTooltip() {
        tooltip.classList.remove('show');
        if (tooltipTimeout) {
            clearTimeout(tooltipTimeout);
        }
    }

    // 初始化时显示气泡
    if (window.innerWidth <= 1024) {
        setTimeout(showTooltip, 1000); // 延迟1秒显示，等页面加载完成
    }

    // 点击侧栏按钮时隐藏气泡
    openBtn.addEventListener('click', hideTooltip);

    // 修改toggleSidebar函数
    const originalToggleSidebar = toggleSidebar;
    window.toggleSidebar = function() {
        originalToggleSidebar();
        hideTooltip();
    };

    // 在窗口大小改变时处理气泡显示
    window.addEventListener('resize', () => {
        const currentWidth = window.innerWidth;
        const sidebar = document.querySelector('.sidebar');
        const openBtn = document.querySelector('.open-sidebar');
        const mainContent = document.querySelector('.main-content');

        if (currentWidth <= 768 || currentWidth <= 1024) {  // 移动端和平板端
            sidebar.classList.add('collapsed');
            mainContent.classList.add('collapsed');
            openBtn.classList.add('visible');
            showTooltip();
        } else {  // 桌面端
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('collapsed');
            openBtn.classList.remove('visible');
            hideTooltip();
        }
    });
});

// 教师详情数据
const teacherDetails = {
    '语文': {
        name: '高恒菊',
        title: '语文教师',
        description: '擅长文学鉴赏和写作指导，致力于培养学生的语文素养和文学审美能力。',
        experience: '15年教学经验',
        achievements: [
            '市级优秀教师',
            '多次指导学生获得作文大赛一等奖',
            '发表多篇教学论文'
        ],
        courses: ['语文写作', '文言文阅读', '现代文阅读'],
        motto: '授人以鱼不如授人以渔'
    },
    '数学': {
        name: '王斌',
        title: '数学教师、副校长',
        description: '江苏扬州人，中共党员，中学高级教师，扬州市高中数学特级教师，现任江苏省江都中学副校长。\n曾获得扬州市高中教育先进个人、扬州市数学教学先进个人、江都区政府优秀教育工作者、江都区教育局优秀教育工作者等荣誉称号。\n曾获得扬州市数学青年教师优质课评比一等奖；多篇论文在省级刊物发表或获省级一等奖；中国数学学会奥林匹克委员会壹级教练员，辅导多名学生获全国、全省奥赛一、二、三等奖。',
        experience: '市特级教师，中学高级教师',
        achievements: [
            '扬州市高中教育先进个人',
            '扬州市数学教学先进个人',
            '江都区政府优秀教育工作者',
            '扬州市数学青年教师优质课评比一等奖',
            '中国数学学会奥林匹克委员会壹级教练员'
        ],
        courses: ['高等数学', '奥林匹克数学', '数学思维训练'],
        motto: '数学即美，逻辑即力量',
        projects: {
            title: '王斌名师工作室',
            launch: {
                date: '2020年7月13日',
                description: '2020年7月13日，"王斌名师工作室"在我校行知楼二楼会议室举行启动仪式暨首次研修活动。工作室领衼人、市特级教师、我校纪委书记王斌，区教育局教科室尤佳主任、夏进军老师，区教育局高中数学教研员练育宏等参加活动。\n启动仪式上，尤佳主任在致辞中对"王斌名师工作室"的成立表示了诚挚的祝贺，对15位经过选拔脱颖而出的研修员寄予了厚望。\n工作室领衼人王斌书记阐述了名师工作室建设的指导思想、工作目标等。王书记指出，我们会用心经营，使之成为教学资源的集散地，努力搭设课堂教学与研究的操练场，创建教师专业发展和成长的给养所，在研修中体验成长。让全体成员在与团队的合作中，博取众家精华，使自己更厚重成熟；总结自己的教学风格与教育思想，使之自成一家。\n活动现场还举行了简短的聘书发放仪式。\n工作室成员纷纷表示，将努力发挥名师工作室的引领、示范、辐射、带动的作用，积极践行高尚师德修养、先进教育理念、厚实专业素养的数学名教师之路，真正成为师德的表率、育人的模范、教学的专家。'
            },
            activities: [
                {
                    title: '送教邵伯高级中学',
                    date: '2020年12月10日',
                    description: '为了实现优质资源共享、促进教育均衡发展，发挥名师工作室的辐射引领作用，12月10日，区"王斌数学名师工作室"领衼人王斌、指导教师葛子祥和工作室部分成员来到邵伯中学，进行2020年骨干教师送教下乡第二次活动。\n在送教活动中，我校骨干老师精心准备教学方案，精彩演绎课堂教学，充分展现了我校名师和骨干教师先进的教学理念、精湛的教学技艺，得到了邵伯中学师生的一致好评。'
                }
            ]
        },
        publications: [
            {title: '数学教学论文（一）', file: 'teachers/wangbin/wb1.pdf'},
            {title: '数学教学论文（二）', file: 'teachers/wangbin/wb2.pdf'},
            {title: '数学教学论文（三）', file: 'teachers/wangbin/wb3.pdf'},
            {title: '数学教学论文（四）', file: 'teachers/wangbin/wb4.pdf'}
        ]
    },
    '英语': {
        name: '吴海燕',
        title: '英语教师、扬州市百优班主任',
        description: '中学一级教师，扬州市百优班主任，扬州市英语学科中青年骨干。曾荣获扬州市微课展评活动一等奖、江都区优质班会课一等奖、江都区教育系统"优秀教育工作者"等荣誉，多篇教育教学论文在省级以上教育期刊发表。\n\n在多年的教学生涯中，吴老师始终以一名优秀教师的标准严格要求自己，师德高尚，爱岗敬业。在教学中，她潜心钻研教材，反复研讨新课标，大量阅读教学刊物，捕捉新的教学信息，勇于探索教育规律，大胆采用新的教学手段，及时进行反思，不断提高教学技能。在班级管理中，她注重培养学生的行为习惯和学习习惯，促进了学生综合素质的提高。把满腔的热情全部倾注到了学生身上和教学中。在平凡的岗位上做出了不平凡的业绩，深受学生、家长、同事、领导的好评。',
        experience: '扬州市百优班主任、扬州市英语学科中青年骨干',
        achievements: [
            '扬州市百优班主任',
            '扬州市微课展评活动一等奖',
            '江都区优质班会课一等奖',
            '江都区教育系统"优秀教育工作者"',
            '多篇教育教学论文在省级以上教育期刊发表'
        ],
        courses: ['英语口语', '英语写作', '英语听力'],
        motto: '所有的逆袭都是有备而来，所有的幸运都是努力埋下的伏笔',
        extraInfo: {
            education: '英语教育学士学位',
            teachingExperience: [
                '中学一级教师',
                '扬州市英语学科中青年骨干',
                '班级管理经验丰富'
            ],
            quotes: [
                '冬日凝春，朔风孕暖。在第一学期结束之际，我们来不及回味，也没有时间感叹，因为：更艰苦的历练还在后面。',
                '高考成功之路，一定是能管住自己、能全力以赴的人走出来的。',
                '少年振衣，可作千里风幡；少年瞬目，亦是万古清流。'
            ]
        }
    },
    '物理': {
        name: '单蕾',
        title: '物理教师',
        description: '物理学硕士，毕业于东南大学物理系，泰州中学物理竞赛教练。课堂风趣幽默，擅长实验探究式教学及实验用具调试，发表或获奖演示实验与CAI相关论文多篇。',
        experience: '8年教学经验',
        achievements: [
            '省级物理竞赛金牌教练',
            '优秀教师称号',
            '多名学生在物理竞赛中获奖'
        ],
        courses: ['物理基础', '实验物理', '物理竞赛'],
        motto: '实践出真知',
        publications: [
            {title: '类比思想在高中物理解题过程中的应用', file: 'teachers/shanlei/magazineAboutAnalogy.pdf'},
            {title: '暗物质', file: 'teachers/shanlei/magazineAboutDark-matter.pdf'},
            {title: '极限思想在高中物理学习中的应用', file: 'teachers/shanlei/magazineAboutExtreme.pdf'},
            {title: '中学物理演示实验的教学模式和作用初探', file: 'teachers/shanlei/magazineAboutPhysicalExperiment.pdf'}
        ]
    },
    '化学': {
        name: '赵如',
        title: '化学教师',
        description: '重视实验教学，培养学生的化学思维和实验操作能力。',
        experience: '11年教学经验',
        achievements: [
            '省级优秀教师',
            '化学教学创新奖',
            '实验教学示范奖'
        ],
        courses: ['化学基础', '实验化学', '有机化学'],
        motto: '化学改变生活'
    },
    '政治': {
        name: '陆朱倩',
        title: '政治教师',
        description: '关注时事政治，培养学生的政治素养和批判性思维。',
        experience: '9年教学经验',
        achievements: [
            '思政课教学能手',
            '优秀班主任',
            '教学创新先进个人'
        ],
        courses: ['思想政治', '时事政治', '社会实践'],
        motto: '修身齐家治国平天下'
    },
    '历史': {
        name: '褚方晨',
        title: '历史教师',
        description: '中共党员，一级教师，2015年在江都区第三届"育花奖"比赛中获"中学历史组"一等奖，2019年在教育部"一师一优课，一课一名师"活动中获"部级优课"，2021年10月在江苏省高中历史优质课比赛中获省二等奖。多篇论文发表于省级期刊，2014年在江苏省教研室组织的论文比赛中获省一等奖。\n\n清华大学"登峰杯"第二届全国中学生课外学术科技作品大赛结果日前揭晓。江都中学褚方晨、童彤老师指导的王正沁、杨云龙、冯儒燕、吴芷静、韩海辰等五位同学斩获一等奖。截至目前，该校在第二届"登峰杯"全国中学生学术科技创新大赛中共计24位同学在数学建模、结构设计、学术作品和数据挖掘竞赛中荣获一等奖。',
        experience: '14年教学经验',
        achievements: [
            '江都区"育花奖"中学历史组一等奖',
            '教育部"一师一优课"部级优课',
            '江苏省高中历史优质课省二等奖',
            '江苏省教研室论文比赛一等奖',
            '清华大学"登峰杯"全国中学生课外学术科技作品大赛指导教师一等奖'
        ],
        courses: ['中国历史', '世界历史', '历史研究方法'],
        motto: '以史为镜，可以知兴替',
        publications: [
            {title: '历史教学论文（一）', file: 'teachers/chufangchen/cfc1.pdf'},
            {title: '历史教学论文（二）', file: 'teachers/chufangchen/cfc2.pdf'}
        ]
    },
    '生物': {
        name: '樊向利',
        title: '生物教师',
        description: '注重生物实验教学，培养学生的科学探究精神。',
        experience: '10年教学经验',
        achievements: [
            '市级教学能手',
            '生物奥赛优秀指导教师',
            '教学创新标兵'
        ],
        courses: ['生物基础', '实验生物', '生态学'],
        motto: '生命的奥秘无穷无尽'
    },
    '地理': {
        name: '刘齐',
        title: '地理教师',
        description: '丰富的教学经验，善于引导学生理解地理规律。',
        experience: '13年教学经验',
        achievements: [
            '市级优秀教师',
            '地理教学能手',
            '教学创新奖'
        ],
        courses: ['自然地理', '人文地理', '地理信息系统'],
        motto: '认识世界，热爱地球'
    }
};

// 显示教师详情
function showTeacherDetail(subject) {
    const detailContainer = document.getElementById('teacherDetail');
    const teacher = teacherDetails[subject];
    const clickedDockItem = document.querySelector(`.dock-item[data-subject="${subject}"]`);
    
    if (!teacher) return;

    // 如果点击的是当前激活的dock项，则关闭详情页
    if (clickedDockItem.classList.contains('active')) {
        closeTeacherDetail();
        return;
    }

    // 更新dock栏激活状态
    document.querySelectorAll('.dock-item').forEach(item => {
        item.classList.remove('active');
    });
    clickedDockItem.classList.add('active');

    // 动态生成详情页HTML
    const html = `
        <div class="container py-4">
            <div class="profile-card animate-fade-in">
                <div class="d-flex justify-content-between align-items-start mb-4">
                    <h2 class="mb-0">${subject} - ${teacher.name}</h2>
                    <button class="btn btn-outline-primary btn-sm" onclick="closeTeacherDetail()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <h4 class="text-muted mb-4">${teacher.title}</h4>
                
                <div class="row">
                    <div class="col-md-8">
                        ${subject === '英语' ? `
                            <div class="text-center mb-4">
                                <img src="image/teacher/Haiyan_Wu.jpg" alt="吴海燕老师" class="rounded-circle" style="width: 150px;">
                            </div>
                        ` : ''}
                        <h5 class="mb-3">教师简介</h5>
                        <p>${teacher.description}</p>
                        
                        <h5 class="mt-4 mb-3">教学经验</h5>
                        <p>${teacher.experience}</p>
                        
                        <h5 class="mt-4 mb-3">主要成就</h5>
                        <ul class="list-unstyled">
                            ${teacher.achievements.map(achievement => 
                                `<li class="mb-2">• ${achievement}</li>`
                            ).join('')}
                        </ul>

                        ${subject === '英语' && teacher.extraInfo ? `
                            <h5 class="mt-4 mb-3">教育背景</h5>
                            <p>${teacher.extraInfo.education}</p>

                            <h5 class="mt-4 mb-3">教学经验详情</h5>
                            <ul class="list-unstyled">
                                ${teacher.extraInfo.teachingExperience.map(exp => 
                                    `<li class="mb-2">• ${exp}</li>`
                                ).join('')}
                            </ul>

                            <h5 class="mt-4 mb-3">教育名言</h5>
                            <ul class="list-unstyled">
                                ${teacher.extraInfo.quotes.map(quote => 
                                    `<li class="mb-2">• "${quote}"</li>`
                                ).join('')}
                            </ul>
                        ` : ''}
                        
                        ${(subject === '物理' || subject === '数学' || subject === '历史') && teacher.publications ? `
                        <h5 class="mt-4 mb-3">期刊投稿</h5>
                        <div class="d-flex flex-column">
                            ${teacher.publications.map(pub => 
                                `<button class="pdf-button" onclick="openPdfPreview('${pub.file}')">
                                    <i class="fas fa-file-pdf"></i>
                                    ${pub.title}
                                </button>`
                            ).join('')}
                        </div>
                        ` : ''}
                        
                        ${subject === '数学' && teacher.projects ? `
                            <h5 class="mt-4 mb-3">开设项目</h5>
                            <h6 class="mb-3">${teacher.projects.title}</h6>
                            
                            <div class="mb-4">
                                <h6 class="text-muted">启动仪式 - ${teacher.projects.launch.date}</h6>
                                <p style="white-space: pre-line">${teacher.projects.launch.description}</p>
                            </div>
                            
                            ${teacher.projects.activities.map(activity => `
                                <div class="mb-4">
                                    <h6 class="text-muted">${activity.title} - ${activity.date}</h6>
                                    <p style="white-space: pre-line">${activity.description}</p>
                                </div>
                            `).join('')}
                        ` : ''}
                        
                    </div>
                    
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title mb-3">任教课程</h5>
                                <ul class="list-unstyled">
                                    ${teacher.courses.map(course => 
                                        `<li class="mb-2">• ${course}</li>`
                                    ).join('')}
                                </ul>
                                
                                <div class="mt-4">
                                    <h5 class="card-title mb-3">教学理念</h5>
                                    <p class="font-italic">"${teacher.motto}"</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    detailContainer.innerHTML = html;
    detailContainer.classList.add('active');
}

// 关闭教师详情
function closeTeacherDetail() {
    const detailContainer = document.getElementById('teacherDetail');
    detailContainer.classList.add('closing');
    
    // 等待动画完成后隐藏
    setTimeout(() => {
        detailContainer.classList.remove('active', 'closing');
        // 移除所有dock栏激活状态
        document.querySelectorAll('.dock-item').forEach(item => {
            item.classList.remove('active');
        });
    }, 300); // 与CSS过渡时间匹配
}

// 打开图片预览
function openImagePreview(imageSrc) {
    const modal = document.getElementById('imagePreviewModal');
    const previewImage = document.getElementById('previewImage');
    
    // 重置图片src以触发新的加载动画
    previewImage.src = '';
    modal.classList.add('active');
    
    // 短暂延迟后设置图片src，确保过渡动画正常运行
    setTimeout(() => {
        previewImage.src = imageSrc;
    }, 50);
    
    document.body.style.overflow = 'hidden';
}

// 关闭图片预览
function closeImagePreview() {
    const modal = document.getElementById('imagePreviewModal');
    const previewImage = document.getElementById('previewImage');
    
    // 先淡出图片
    previewImage.style.opacity = '0';
    previewImage.style.transform = 'scale(0.8)';
    
    // 等待图片动画完成后关闭模态框
    setTimeout(() => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // 重置图片样式
        setTimeout(() => {
            previewImage.style.opacity = '';
            previewImage.style.transform = '';
        }, 300);
    }, 300);
}

// PDF预览函数（使用iframe）
async function openPdfPreview(pdfPath) {
    // 使用 SweetAlert2 显示提示
    const result = await Swal.fire({
        title: 'PDF 预览提示',
        text: '浏览器自身若支持则可预览；若不支持会自动下载，可自行预览',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: '继续预览',
        cancelButtonText: '取消',
        confirmButtonColor: '#d4976a',
        cancelButtonColor: '#6e7881',
        background: document.body.dataset.theme === 'dark' ? '#363636' : '#fff',
        color: document.body.dataset.theme === 'dark' ? '#e0e0e0' : '#4a3f35'
    });

    // 如果用户点击确认
    if (result.isConfirmed) {
        const modal = new bootstrap.Modal(document.getElementById('pdfPreviewModal'));
        const container = document.getElementById('pdfViewer');
        
        // 清空容器
        container.innerHTML = '';

        // 创建 iframe 元素
        const iframe = document.createElement('iframe');
        iframe.src = pdfPath;
        iframe.style.width = '100%';
        iframe.style.height = '800px';
        iframe.style.border = 'none';

        // 将 iframe 添加到容器中
        container.appendChild(iframe);
        modal.show();
    }
}