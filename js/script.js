function toggleTheme() {
    document.body.dataset.theme = 
        document.body.dataset.theme === 'dark' ? 'light' : 'dark';
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.toggle-sidebar');
    sidebar.classList.toggle('collapsed');
    toggleBtn.classList.toggle('collapsed');
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    // 自动检测系统主题
    if (window.matchMedia && 
        window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.dataset.theme = 'dark';
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

    // 添加侧栏自动收起功能
    setTimeout(() => {
        const sidebar = document.querySelector('.sidebar');
        const toggleBtn = document.querySelector('.toggle-sidebar');
        sidebar.classList.add('collapsed');
        toggleBtn.classList.add('collapsed');
    }, 5000);
});
