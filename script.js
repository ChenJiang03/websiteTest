// 初始化 AOS 动画库
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// 自定义光标效果
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button, .nav-link');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // 使用 GSAP 实现平滑跟随效果
    gsap.to(cursorFollower, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.3
    });
});

// 鼠标悬停效果
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
        cursorFollower.style.opacity = '0.5';
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
        cursorFollower.style.opacity = '1';
    });
});

// 导航栏滚动效果
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // 向下滚动
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // 向上滚动
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// 移动端菜单切换
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // 添加菜单动画
    const bars = menuToggle.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (menuToggle.classList.contains('active')) {
            gsap.to(bar, {
                rotation: index === 0 ? 45 : index === 1 ? 0 : -45,
                y: index === 0 ? 8 : 0,
                duration: 0.3
            });
        } else {
            gsap.to(bar, {
                rotation: 0,
                y: 0,
                duration: 0.3
            });
        }
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 70
                },
                ease: 'power2.inOut'
            });
            
            // 如果菜单是打开的，点击后关闭
            if (navLinks.classList.contains('active')) {
                menuToggle.click();
            }
        }
    });
});

// 初始化卡片动画
function initCardAnimations() {
    const floatingCards = document.querySelectorAll('.floating-cards .card');
    floatingCards.forEach((card, index) => {
        const rotation = index === 0 ? -15 : index === 1 ? 15 : 5;
        card.style.setProperty('--rotation', `${rotation}deg`);
        
        // 添加鼠标跟随效果
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            gsap.to(card, {
                rotationY: (x - rect.width / 2) / 10,
                rotationX: -(y - rect.height / 2) / 10,
                duration: 0.5
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.5
            });
        });
    });
}

// 初始化游戏卡片效果
function initGameCardEffects() {
    const gameCards = document.querySelectorAll('.game-item');
    gameCards.forEach(item => {
        const image = item.querySelector('img');
        
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            gsap.to(image, {
                x: moveX,
                y: moveY,
                duration: 0.5
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(image, {
                x: 0,
                y: 0,
                duration: 0.5
            });
        });
    });
}

// 页面加载动画
window.addEventListener('load', () => {
    // 隐藏加载动画
    const loader = document.querySelector('.loader');
    if (loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 1,
            onComplete: () => loader.remove()
        });
    }
    
    // 首页内容动画
    gsap.from('.hero-content', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5
    });
    
    gsap.from('.floating-cards .card', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.8
    });
    
    // 初始化卡片动画
    initCardAnimations();
    initGameCardEffects();
});

// 视差滚动效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // 英雄区域视差
    gsap.to('.hero-overlay', {
        opacity: 0.5 + scrolled * 0.001,
        duration: 0.5
    });
    
    // 浮动卡片视差
    const parallaxCards = document.querySelectorAll('.floating-cards .card');
    parallaxCards.forEach((card, index) => {
        const speed = 0.1 + index * 0.05;
        gsap.to(card, {
            y: scrolled * speed,
            rotation: scrolled * 0.02,
            duration: 0.5
        });
    });
});

// 添加页面切换效果
document.addEventListener('DOMContentLoaded', () => {
    // 为所有链接添加页面切换效果
    document.querySelectorAll('a').forEach(link => {
        if (link.hostname === window.location.hostname) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                
                // 创建过渡效果
                const transition = document.createElement('div');
                transition.className = 'page-transition';
                document.body.appendChild(transition);
                
                // 动画
                gsap.to(transition, {
                    scaleY: 1,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        window.location.href = target;
                    }
                });
            });
        }
    });
});

// 扑克牌动画效果
const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 2}s`;
});

// 游戏卡片悬停效果
const gameItems = document.querySelectorAll('.game-item');
gameItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// 规则卡片展开效果
const ruleCards = document.querySelectorAll('.rule-card');
ruleCards.forEach(card => {
    const details = card.querySelector('.rule-details');
    if (details) {
        details.style.maxHeight = '0';
        details.style.overflow = 'hidden';
        details.style.transition = 'max-height 0.3s ease-out';
        
        card.addEventListener('mouseenter', () => {
            details.style.maxHeight = details.scrollHeight + 'px';
        });
        
        card.addEventListener('mouseleave', () => {
            details.style.maxHeight = '0';
        });
    }
});

// 添加作品项动画
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.work-item').forEach(item => {
    observer.observe(item);
}); 