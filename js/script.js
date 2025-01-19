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
});

// 教师详情数据
const teacherDetails = {
    '语文': {
        name: '张老师',
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
        name: '王老师',
        title: '数学教师',
        description: '注重培养学生的数学思维和解题能力，善于用生动的例子讲解复杂的数学概念。',
        experience: '12年教学经验',
        achievements: [
            '省级优秀教师',
            '数学竞赛金牌教练',
            '教学创新奖'
        ],
        courses: ['数学基础', '奥林匹克数学', '数学思维训练'],
        motto: '数学即美，逻辑即力量'
    },
    '英语': {
        name: '吴海燕',
        title: '英语教师、班主任',
        description: '致力于培养学生的英语综合应用能力，创新教学方法，深受学生喜爱。',
        experience: '10年教学经验',
        achievements: [
            '市级优秀班主任',
            '英语教学能手',
            '优秀教育工作者'
        ],
        courses: ['英语口语', '英语写作', '英语听力'],
        motto: '不积跬步，无以至千里'
    },
    '物理': {
        name: '李老师',
        title: '物理教师',
        description: '专注于物理实验教学，善于引导学生发现和解决问题。',
        experience: '8年教学经验',
        achievements: [
            '市级物理竞赛金牌教练',
            '优秀教师称号',
            '多名学生在物理竞赛中获奖'
        ],
        courses: ['物理基础', '实验物理', '物理竞赛'],
        motto: '实践出真知'
    },
    '化学': {
        name: '刘老师',
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
        name: '赵老师',
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
        name: '周老师',
        title: '历史教师',
        description: '深厚的历史功底，善于讲述历史故事，让历史课生动有趣。',
        experience: '14年教学经验',
        achievements: [
            '市级优秀教师',
            '历史教学创新奖',
            '教学成果一等奖'
        ],
        courses: ['中国历史', '世界历史', '历史研究方法'],
        motto: '以史为镜，可以知兴替'
    },
    '生物': {
        name: '孙老师',
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
        name: '陈老师',
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
    
    if (!teacher) return;

    // 更新dock栏激活状态
    document.querySelectorAll('.dock-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.dock-item[data-subject="${subject}"]`).classList.add('active');

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
        // 移除dock栏激活状态
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