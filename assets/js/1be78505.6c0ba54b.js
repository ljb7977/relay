"use strict";(self.webpackChunkrelay_website=self.webpackChunkrelay_website||[]).push([[29514,4972],{19963:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ye});var a=n(67294),l=n(34334),r=n(10833),o=n(35281),i=n(43320),c=n(53438),s=n(74477),d=n(1116),m=n(34660),u=n(95999),b=n(12466),p=n(85936);const v="backToTopButton_sjWU",h="backToTopButtonShow_xfvO";function f(){var e=function(e){var t=e.threshold,n=(0,a.useState)(!1),l=n[0],r=n[1],o=(0,a.useRef)(!1),i=(0,b.Ct)(),c=i.startScroll,s=i.cancelScroll;return(0,b.RF)((function(e,n){var a=e.scrollY,l=null==n?void 0:n.scrollY;l&&(o.current?o.current=!1:a>=l?(s(),r(!1)):a<t?r(!1):a+window.innerHeight<document.documentElement.scrollHeight&&r(!0))})),(0,p.S)((function(e){e.location.hash&&(o.current=!0,r(!1))})),{shown:l,scrollToTop:function(){return c(0)}}}({threshold:300}),t=e.shown,n=e.scrollToTop;return a.createElement("button",{"aria-label":(0,u.translate)({id:"theme.BackToTopButton.buttonAriaLabel",message:"Scroll back to top",description:"The ARIA label for the back to top button"}),className:(0,l.Z)("clean-btn",o.k.common.backToTopButton,v,t&&h),type:"button",onClick:n})}var E=n(76775),g=n(87524),_=n(86668),k=n(21327),C=n(83117);function N(e){return a.createElement("svg",(0,C.Z)({width:"20",height:"20","aria-hidden":"true"},e),a.createElement("g",{fill:"#7a7a7a"},a.createElement("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),a.createElement("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})))}const S="collapseSidebarButton_PEFL",I="collapseSidebarButtonIcon_kv0_";function Z(e){var t=e.onClick;return a.createElement("button",{type:"button",title:(0,u.translate)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,u.translate)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,l.Z)("button button--secondary button--outline",S),onClick:t},a.createElement(N,{className:I}))}var x=n(59689),y=n(80102),T=n(44700),w=Symbol("EmptyContext"),L=a.createContext(w);function M(e){var t=e.children,n=(0,a.useState)(null),l=n[0],r=n[1],o=(0,a.useMemo)((function(){return{expandedItem:l,setExpandedItem:r}}),[l]);return a.createElement(L.Provider,{value:o},t)}var A=n(86043),B=n(48596),F=n(39960),P=n(72389),H=["item","onItemClick","activePath","level","index"];function W(e){var t=e.categoryLabel,n=e.onClick;return a.createElement("button",{"aria-label":(0,u.translate)({id:"theme.DocSidebarItem.toggleCollapsedCategoryAriaLabel",message:"Toggle the collapsible sidebar category '{label}'",description:"The ARIA label to toggle the collapsible sidebar category"},{label:t}),type:"button",className:"clean-btn menu__caret",onClick:n})}function D(e){var t=e.item,n=e.onItemClick,r=e.activePath,i=e.level,s=e.index,d=(0,y.Z)(e,H),m=t.items,u=t.label,b=t.collapsible,p=t.className,v=t.href,h=(0,_.L)().docs.sidebar.autoCollapseCategories,f=function(e){var t=(0,P.default)();return(0,a.useMemo)((function(){return e.href?e.href:!t&&e.collapsible?(0,c.Wl)(e):void 0}),[e,t])}(t),E=(0,c._F)(t,r),g=(0,B.Mg)(v,r),k=(0,A.u)({initialState:function(){return!!b&&(!E&&t.collapsed)}}),N=k.collapsed,S=k.setCollapsed,I=function(){var e=(0,a.useContext)(L);if(e===w)throw new T.i6("DocSidebarItemsExpandedStateProvider");return e}(),Z=I.expandedItem,x=I.setExpandedItem,M=function(e){void 0===e&&(e=!N),x(e?null:s),S(e)};return function(e){var t=e.isActive,n=e.collapsed,l=e.updateCollapsed,r=(0,T.D9)(t);(0,a.useEffect)((function(){t&&!r&&n&&l(!1)}),[t,r,n,l])}({isActive:E,collapsed:N,updateCollapsed:M}),(0,a.useEffect)((function(){b&&null!=Z&&Z!==s&&h&&S(!0)}),[b,Z,s,S,h]),a.createElement("li",{className:(0,l.Z)(o.k.docs.docSidebarItemCategory,o.k.docs.docSidebarItemCategoryLevel(i),"menu__list-item",{"menu__list-item--collapsed":N},p)},a.createElement("div",{className:(0,l.Z)("menu__list-item-collapsible",{"menu__list-item-collapsible--active":g})},a.createElement(F.default,(0,C.Z)({className:(0,l.Z)("menu__link",{"menu__link--sublist":b,"menu__link--sublist-caret":!v&&b,"menu__link--active":E}),onClick:b?function(e){null==n||n(t),v?M(!1):(e.preventDefault(),M())}:function(){null==n||n(t)},"aria-current":g?"page":void 0,"aria-expanded":b?!N:void 0,href:b?null!=f?f:"#":f},d),u),v&&b&&a.createElement(W,{categoryLabel:u,onClick:function(e){e.preventDefault(),M()}})),a.createElement(A.z,{lazy:!0,as:"ul",className:"menu__list",collapsed:N},a.createElement(J,{items:m,tabIndex:N?-1:0,onItemClick:n,activePath:r,level:i+1})))}var R=n(13919),z=n(39471);const U="menuExternalLink_NmtK";var V=["item","onItemClick","activePath","level","index"];function K(e){var t=e.item,n=e.onItemClick,r=e.activePath,i=e.level,s=(e.index,(0,y.Z)(e,V)),d=t.href,m=t.label,u=t.className,b=t.autoAddBaseUrl,p=(0,c._F)(t,r),v=(0,R.Z)(d);return a.createElement("li",{className:(0,l.Z)(o.k.docs.docSidebarItemLink,o.k.docs.docSidebarItemLinkLevel(i),"menu__list-item",u),key:m},a.createElement(F.default,(0,C.Z)({className:(0,l.Z)("menu__link",!v&&U,{"menu__link--active":p}),autoAddBaseUrl:b,"aria-current":p?"page":void 0,to:d},v&&{onClick:n?function(){return n(t)}:void 0},s),m,!v&&a.createElement(z.Z,null)))}const j="menuHtmlItem_M9Kj";function q(e){var t=e.item,n=e.level,r=e.index,i=t.value,c=t.defaultStyle,s=t.className;return a.createElement("li",{className:(0,l.Z)(o.k.docs.docSidebarItemLink,o.k.docs.docSidebarItemLinkLevel(n),c&&[j,"menu__list-item"],s),key:r,dangerouslySetInnerHTML:{__html:i}})}var G=["item"];function Y(e){var t=e.item,n=(0,y.Z)(e,G);switch(t.type){case"category":return a.createElement(D,(0,C.Z)({item:t},n));case"html":return a.createElement(q,(0,C.Z)({item:t},n));default:return a.createElement(K,(0,C.Z)({item:t},n))}}var O=["items"];function X(e){var t=e.items,n=(0,y.Z)(e,O);return a.createElement(M,null,t.map((function(e,t){return a.createElement(Y,(0,C.Z)({key:t,item:e,index:t},n))})))}const J=(0,a.memo)(X),Q="menu_SIkG",$="menuWithAnnouncementBar_GW3s";function ee(e){var t=e.path,n=e.sidebar,r=e.className,i=function(){var e=(0,x.nT)().isActive,t=(0,a.useState)(e),n=t[0],l=t[1];return(0,b.RF)((function(t){var n=t.scrollY;e&&l(0===n)}),[e]),e&&n}();return a.createElement("nav",{className:(0,l.Z)("menu thin-scrollbar",Q,i&&$,r)},a.createElement("ul",{className:(0,l.Z)(o.k.docs.docSidebarMenu,"menu__list")},a.createElement(J,{items:n,activePath:t,level:1})))}const te="sidebar_njMd",ne="sidebarWithHideableNavbar_wUlq",ae="sidebarHidden_VK0M",le="sidebarLogo_isFc";function re(e){var t=e.path,n=e.sidebar,r=e.onCollapse,o=e.isHidden,i=(0,_.L)(),c=i.navbar.hideOnScroll,s=i.docs.sidebar.hideable;return a.createElement("div",{className:(0,l.Z)(te,c&&ne,o&&ae)},c&&a.createElement(k.Z,{tabIndex:-1,className:le}),a.createElement(ee,{path:t,sidebar:n}),s&&a.createElement(Z,{onClick:r}))}const oe=a.memo(re);var ie=n(13102),ce=n(72961),se=function(e){var t=e.sidebar,n=e.path,r=(0,ce.e)();return a.createElement("ul",{className:(0,l.Z)(o.k.docs.docSidebarMenu,"menu__list")},a.createElement(J,{items:t,activePath:n,onItemClick:function(e){"category"===e.type&&e.href&&r.toggle(),"link"===e.type&&r.toggle()},level:1}))};function de(e){return a.createElement(ie.Zo,{component:se,props:e})}const me=a.memo(de);function ue(e){var t=(0,g.i)(),n="desktop"===t||"ssr"===t,l="mobile"===t;return a.createElement(a.Fragment,null,n&&a.createElement(oe,e),l&&a.createElement(me,e))}const be="expandButton_m80_",pe="expandButtonIcon_BlDH";function ve(e){var t=e.toggleSidebar;return a.createElement("div",{className:be,title:(0,u.translate)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,u.translate)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:t,onClick:t},a.createElement(N,{className:pe}))}const he="docSidebarContainer_b6E3",fe="docSidebarContainerHidden_b3ry";function Ee(e){var t,n=e.children,l=(0,d.V)();return a.createElement(a.Fragment,{key:null!=(t=null==l?void 0:l.name)?t:"noSidebar"},n)}function ge(e){var t=e.sidebar,n=e.hiddenSidebarContainer,r=e.setHiddenSidebarContainer,i=(0,E.TH)().pathname,c=(0,a.useState)(!1),s=c[0],d=c[1],m=(0,a.useCallback)((function(){s&&d(!1),r((function(e){return!e}))}),[r,s]);return a.createElement("aside",{className:(0,l.Z)(o.k.docs.docSidebarContainer,he,n&&fe),onTransitionEnd:function(e){e.currentTarget.classList.contains(he)&&n&&d(!0)}},a.createElement(Ee,null,a.createElement(ue,{sidebar:t,path:i,onCollapse:m,isHidden:s})),s&&a.createElement(ve,{toggleSidebar:m}))}const _e={docMainContainer:"docMainContainer_gTbr",docMainContainerEnhanced:"docMainContainerEnhanced_Uz_u",docItemWrapperEnhanced:"docItemWrapperEnhanced_czyv"};function ke(e){var t=e.hiddenSidebarContainer,n=e.children,r=(0,d.V)();return a.createElement("main",{className:(0,l.Z)(_e.docMainContainer,(t||!r)&&_e.docMainContainerEnhanced)},a.createElement("div",{className:(0,l.Z)("container padding-top--md padding-bottom--lg",_e.docItemWrapper,t&&_e.docItemWrapperEnhanced)},n))}const Ce="docPage__5DB",Ne="docsWrapper_BCFX";function Se(e){var t=e.children,n=(0,d.V)(),l=(0,a.useState)(!1),r=l[0],o=l[1];return a.createElement(m.Z,{wrapperClassName:Ne},a.createElement(f,null),a.createElement("div",{className:Ce},n&&a.createElement(ge,{sidebar:n.items,hiddenSidebarContainer:r,setHiddenSidebarContainer:o}),a.createElement(ke,{hiddenSidebarContainer:r},t)))}var Ie=n(4972),Ze=n(90197);function xe(e){var t=e.versionMetadata;return a.createElement(a.Fragment,null,a.createElement(Ze.Z,{version:t.version,tag:(0,i.os)(t.pluginId,t.version)}),a.createElement(r.d,null,t.noIndex&&a.createElement("meta",{name:"robots",content:"noindex, nofollow"})))}function ye(e){var t=e.versionMetadata,n=(0,c.hI)(e);if(!n)return a.createElement(Ie.default,null);var i=n.docElement,m=n.sidebarName,u=n.sidebarItems;return a.createElement(a.Fragment,null,a.createElement(xe,e),a.createElement(r.FG,{className:(0,l.Z)(o.k.wrapper.docsPages,o.k.page.docsDocPage,e.versionMetadata.className)},a.createElement(s.q,{version:t},a.createElement(d.b,{name:m,items:u},a.createElement(Se,null,i)))))}},4972:(e,t,n)=>{n.r(t),n.d(t,{default:()=>i});var a=n(67294),l=n(95999),r=n(10833),o=n(34660);function i(){return a.createElement(a.Fragment,null,a.createElement(r.d,{title:(0,l.translate)({id:"theme.NotFound.title",message:"Page Not Found"})}),a.createElement(o.Z,null,a.createElement("main",{className:"container margin-vert--xl"},a.createElement("div",{className:"row"},a.createElement("div",{className:"col col--6 col--offset-3"},a.createElement("h1",{className:"hero__title"},a.createElement(l.default,{id:"theme.NotFound.title",description:"The title of the 404 page"},"Page Not Found")),a.createElement("p",null,a.createElement(l.default,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page"},"We could not find what you were looking for.")),a.createElement("p",null,a.createElement(l.default,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page"},"Please contact the owner of the site that linked you to the original URL and let them know their link is broken.")))))))}},74477:(e,t,n)=>{n.d(t,{E:()=>i,q:()=>o});var a=n(67294),l=n(44700),r=a.createContext(null);function o(e){var t=e.children,n=e.version;return a.createElement(r.Provider,{value:n},t)}function i(){var e=(0,a.useContext)(r);if(null===e)throw new l.i6("DocsVersionProvider");return e}}}]);