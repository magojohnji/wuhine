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
});