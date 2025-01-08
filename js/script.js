function toggleTheme() {
    const isDark = document.body.dataset.theme === 'dark';
    document.body.dataset.theme = isDark ? 'light' : 'dark';
    
    // 切换图标：暗色模式显示太阳，亮色模式显示月亮
    const themeIcon = document.querySelector('.theme-switch i');
    themeIcon.className = `fas fa-${isDark ? 'moon' : 'sun'}`;
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.toggle-sidebar');
    const mainContent = document.querySelector('.main-content');
    
    sidebar.classList.toggle('collapsed');
    toggleBtn.classList.toggle('collapsed');
    mainContent.classList.toggle('collapsed');
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 检测设备类型并设置侧栏初始状态
    if (window.innerWidth <= 768) {
        document.querySelector('.sidebar').classList.add('collapsed');
        document.querySelector('.toggle-sidebar').classList.add('collapsed');
        document.querySelector('.main-content').classList.add('collapsed');
    }

    // 自动检测系统主题
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.dataset.theme = prefersDark ? 'dark' : 'light';
    document.querySelector('.theme-switch i').className = 
        `fas fa-${prefersDark ? 'sun' : 'moon'}`;

    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', e => {
            document.body.dataset.theme = e.matches ? 'dark' : 'light';
        });

    // 添加选项卡切换功能
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
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
});
