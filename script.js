// DotTile 游戏官网交互脚本

document.addEventListener('DOMContentLoaded', function() {
    // 流光溢彩横幅
    initAwardBanner();

    // 移动端菜单切换
    initMobileMenu();

    // 平滑滚动
    initSmoothScroll();

    // 导航栏滚动效果
    initNavbarScroll();

    // 役种标签切换
    initYakuTabs();

    // 道具稀有度切换
    initItemsTabs();

    // 麻将牌动画
    initTileAnimation();

    // 滚动动画
    initScrollAnimations();
});

// 流光溢彩横幅
function initAwardBanner() {
    const banner = document.getElementById('awardBanner');
    const closeBtn = document.getElementById('awardClose');

    function updateBannerOffset() {
        const h = (banner && !banner.classList.contains('dismissed'))
            ? banner.offsetHeight
            : 0;
        document.documentElement.style.setProperty('--banner-height', h + 'px');
    }

    if (closeBtn && banner) {
        closeBtn.addEventListener('click', function () {
            banner.classList.add('dismissed');
            // 动画结束后再更新偏移量
            setTimeout(updateBannerOffset, 420);
        });
    }

    updateBannerOffset();
    window.addEventListener('resize', updateBannerOffset);
}

// 移动端菜单
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // 点击链接后关闭菜单
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // 导航栏高度
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 导航栏滚动效果
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // 添加/移除滚动样式
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // 隐藏/显示导航栏
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }

        lastScroll = currentScroll;
    });
}

// 役种标签切换
function initYakuTabs() {
    const tabs = document.querySelectorAll('.yaku-tab');
    const panels = document.querySelectorAll('.yaku-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;

            // 切换标签状态
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // 切换面板
            panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetTab + '-panel') {
                    panel.classList.add('active');
                }
            });
        });
    });
}

// 道具稀有度标签切换
function initItemsTabs() {
    const tabs = document.querySelectorAll('.rarity-tab');
    const panels = document.querySelectorAll('.items-panel');

    console.log('Found tabs:', tabs.length);
    console.log('Found panels:', panels.length);

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const targetRarity = this.dataset.rarity;
            console.log('Clicked tab:', targetRarity);

            // 切换标签状态
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // 切换面板
            panels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetRarity + '-panel') {
                    panel.classList.add('active');
                }
            });
        });
    });
}

// 麻将牌动画效果
function initTileAnimation() {
    const tiles = document.querySelectorAll('.tile');

    tiles.forEach((tile, index) => {
        // 初始延迟动画
        tile.style.animationDelay = (index * 0.2) + 's';

        // 鼠标悬停效果
        tile.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) scale(1.1) rotateY(10deg)';
        });

        tile.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 使用setTimeout来创建交错效果,但只在可见元素之间
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 50); // 减少延迟到50ms
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animateElements = document.querySelectorAll(
        '.feature-card, .tile-category, .yaku-card, .item-card, .boss-card, ' +
        '.events-feature-card, .event-item-card, .node-type-card'
    );

    animateElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease'; // 移除延迟,加快动画
        observer.observe(el);
    });
}

// 添加动画类
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// 页面加载完成后的特效
window.addEventListener('load', function() {
    document.body.classList.add('loaded');

    // Hero区域标题动画
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.classList.add('animate');
    }
});
