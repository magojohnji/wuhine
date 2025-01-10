function toggleTheme() {
    const isDark = document.body.dataset.theme === 'dark';
    document.body.dataset.theme = isDark ? 'light' : 'dark';
    
    // 切换图标：暗色模式显示太阳，亮色模式显示月亮
    const themeIcon = document.querySelector('.right-section .btn i');  // 修改选择器
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

document.addEventListener('DOMContentLoaded', () => {
    // 检测设备类型并设置侧栏初始状态
    const isMobile = window.innerWidth <= 768;
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.toggle-sidebar');
    const mainContent = document.querySelector('.main-content');

    if (isMobile || window.innerWidth <= 1024) {
        sidebar.classList.add('collapsed');
        toggleBtn.classList.add('collapsed');
        mainContent.classList.add('collapsed');
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
        const toggleBtn = document.querySelector('.toggle-sidebar');
        const mainContent = document.querySelector('.main-content');

        if (currentWidth <= 768) {  // 移动端
            sidebar.classList.add('collapsed');
            toggleBtn.classList.add('collapsed');
            mainContent.classList.add('collapsed');
        } else if (currentWidth <= 1024) {  // 平板端
            sidebar.classList.add('collapsed');
            toggleBtn.classList.add('collapsed');
            mainContent.classList.add('collapsed');
        } else {  // 桌面端
            sidebar.classList.remove('collapsed');
            toggleBtn.classList.remove('collapsed');
            mainContent.classList.remove('collapsed');
        }
    });

    // 初始检查屏幕宽度
    if (window.innerWidth <= 1024) {
        document.querySelector('.sidebar').classList.add('collapsed');
        document.querySelector('.toggle-sidebar').classList.add('collapsed');
        document.querySelector('.main-content').classList.add('collapsed');
    }
});