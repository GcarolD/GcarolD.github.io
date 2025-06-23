---
layout: null
sitemap:
exclude: 'yes'
---

$(document).ready(function () {
  {% if site.disable_landing_page != true %}

  // ✅ 绑定导航链接点击事件（包含顶部导航和侧边栏）
  $('ul.navigation a').click(function (e) {
    const href = $(this).attr('href');

    // ✅ 判断是否是锚点跳转链接，如 #about 或 /#about
    const isHashLink = href.startsWith('#') || href.includes('/#');

    if (isHashLink) {
      e.preventDefault();

      // 提取目标 section ID，例如 "#about" → "about"，"/#about" → "about"
      const targetId = href.split('#')[1];

      // 判断当前是否首页
      const isHome =
        window.location.pathname === '{{ site.baseurl }}/' ||
        window.location.pathname === '{{ site.baseurl }}/index.html';

      if (!isHome) {
        // 当前不是首页，跳转到首页并带上 hash
        window.location.href = '{{ site.baseurl }}/#' + targetId;
        return; // 跳转后首页会自动显示对应 section
      }

      // 已经在首页，直接切换 section
      if (targetId) {
        // 折叠 panel-cover（首页面板收缩动画）
        if (!$('.panel-cover').hasClass('panel-cover--collapsed')) {
          const currentWidth = $('.panel-cover').width();
          if (currentWidth < 960) {
            $('.panel-cover').addClass('panel-cover--collapsed');
            $('.content-wrapper').addClass('animated slideInRight');
          } else {
            $('.panel-cover').css('max-width', currentWidth);
            $('.panel-cover').animate({ 'max-width': '530px', 'width': '40%' }, 400);
          }
        }

        // 切换显示对应 section
        showSection(targetId);

        // 移动端菜单关闭
        $('.navigation-wrapper').removeClass('visible animated bounceInDown');
        $('.btn-mobile-menu__icon')
          .removeClass('icon-x-circle animated fadeIn')
          .addClass('icon-list');

        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    // 如果不是 hash 链接（如外链），默认跳转，无需处理
  });

  // 页面首次加载时处理面板折叠
  if (window.location.hash && window.location.hash === '#blog') {
    $('.panel-cover').addClass('panel-cover--collapsed');
  }

  if (
    window.location.pathname !== '{{ site.baseurl }}/' &&
    window.location.pathname !== '{{ site.baseurl }}/index.html'
  ) {
    $('.panel-cover').addClass('panel-cover--collapsed');
  }

  {% endif %}

  // 移动端菜单按钮点击切换
  $('.btn-mobile-menu').click(function () {
    $('.navigation-wrapper').toggleClass('visible animated bounceInDown');
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn');
  });

  // 特定按钮收起菜单（比如 blog 按钮）
  $('.navigation-wrapper .blog-button').click(function () {
    $('.navigation-wrapper').toggleClass('visible');
    $('.btn-mobile-menu__icon').toggleClass('icon-list icon-x-circle animated fadeIn');
  });

  // 定义可切换的 section 列表
  const sections = ['about', 'publications', 'projects'];

  // 切换显示某个 section，隐藏其他
  function showSection(id) {
    sections.forEach(function (sectionId) {
      if ($('#' + sectionId).length) {
        if (sectionId === id) {
          $('#' + sectionId).show();
        } else {
          $('#' + sectionId).hide();
        }
      }
    });
  }

  // 页面首次加载时根据 hash 默认显示对应区域
  const hash = window.location.hash;
  if (hash && sections.includes(hash.substring(1))) {
    showSection(hash.substring(1));
  } else {
    showSection('about');
  }
});

