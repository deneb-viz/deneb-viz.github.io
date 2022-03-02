"use strict";(self.webpackChunkdeneb_doc=self.webpackChunkdeneb_doc||[]).push([[6515],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=c(n),m=r,h=d["".concat(l,".").concat(m)]||d[m]||p[m]||i;return n?a.createElement(h,o(o({ref:t},u),{},{components:n})):a.createElement(h,o({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var c=2;c<i;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8468:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return u},default:function(){return d}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],s={id:"performance-considerations",description:"Things to consider when working with large datasets or a large quantity of marks",slug:"/performance",title:"Performance Considerations"},l="Performance Considerations",c={unversionedId:"deeper-concepts/performance-considerations",id:"deeper-concepts/performance-considerations",title:"Performance Considerations",description:"Things to consider when working with large datasets or a large quantity of marks",source:"@site/docs/deeper-concepts/performance-considerations.md",sourceDirName:"deeper-concepts",slug:"/performance",permalink:"/next/performance",editUrl:"https://github.com/deneb-viz/deneb-viz.github.io/edit/source/docs/deeper-concepts/performance-considerations.md",tags:[],version:"current",frontMatter:{id:"performance-considerations",description:"Things to consider when working with large datasets or a large quantity of marks",slug:"/performance",title:"Performance Considerations"},sidebar:"mainSidebar",previous:{title:"Templates",permalink:"/next/templates"},next:{title:"Interactivity Features",permalink:"/next/interactivity-overview"}},u=[{value:"It&#39;s Early Days for Deneb",id:"its-early-days-for-deneb",children:[],level:2},{value:"Selection of Renderer",id:"selection-of-renderer",children:[],level:2},{value:"Applying Changes as You Type vs. Manually",id:"applying-changes-as-you-type-vs-manually",children:[],level:2},{value:"Include only Necessary Columns and Measures",id:"include-only-necessary-columns-and-measures",children:[],level:2},{value:"The Performance Tuning Property Menu",id:"the-performance-tuning-property-menu",children:[{value:"Recalculate During Resize",id:"recalculate-during-resize",children:[],level:3}],level:2}],p={toc:u};function d(e){var t=e.components,s=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},p,s,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"performance-considerations"},"Performance Considerations"),(0,i.kt)("h2",{id:"its-early-days-for-deneb"},"It's Early Days for Deneb"),(0,i.kt)("p",null,"We're in the very first stages of getting Deneb off the ground and most of what has been done so far has been around solving technical challenges to get the functionality working within a custom visual."),(0,i.kt)("p",null,"For the majority of cases, Deneb should perform quite well, but if you're building a behemoth visual with lots of data, then you may need to think about the resulting output and the demand this can potentially create on a client machine - either while you're building a visual, or when your end users are consuming it."),(0,i.kt)("p",null,"Please bear in mind that while care has been taken so far to try and make things work nicely, we will apply concerted effort to work on performance of the interface as we iterate."),(0,i.kt)("p",null,"The following page has some recommendations for keeping performance optimal."),(0,i.kt)("h2",{id:"selection-of-renderer"},"Selection of Renderer"),(0,i.kt)("p",null,"You can specify the renderer to use ",(0,i.kt)("a",{parentName:"p",href:"visual-editor#settings-tab"},"in the Settings panel of the Visual Editor"),"."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"SVG")," is the default , which will render your specification using vector graphics. You also have the option to select ",(0,i.kt)("strong",{parentName:"p"},"Canvas"),", which will use pixel graphics."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},'SVG is typically used for the lion\'s share of simple data visualizations and tyically produces "clearer" output that scales well at a variety of sizes.')),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"However much like adding multiple visuals to a report page in Power BI can have an impact on performance, using SVG with a lot of data can have similar detrimental effects on performance.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"It's recommended that you try and stick with Canvas, particularly if you're prototyping a design and aren't sure on how many elements or data points you're potentially working with.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"If you want to use SVG and you're working with a lot of data, consider if you can use elements that consolidate many data points into a single item on-screen, such as a ",(0,i.kt)("inlineCode",{parentName:"p"},"line")," rather than a ",(0,i.kt)("inlineCode",{parentName:"p"},"point"),", as this helps reduce the number of moving parts."))),(0,i.kt)("p",null,"For more details on Canvas vs. SVG, ",(0,i.kt)("a",{parentName:"p",href:"https://css-tricks.com/when-to-use-svg-vs-when-to-use-canvas"},"there's a great article here at CSS-Tricks")," that consolidates a lot of useful info and summarizes a number of pros and cons."),(0,i.kt)("h2",{id:"applying-changes-as-you-type-vs-manually"},"Applying Changes as You Type vs. Manually"),(0,i.kt)("p",null,"The Visual Editor has the ability to ",(0,i.kt)("a",{parentName:"p",href:"visual-editor#toggle-auto-apply-ctrl--shift--enter"},"apply changes to your output as you type them"),". Whilst this is pretty cool, it can really slow things down if you're making many changes to a particularly ambitious specification in a short space of time, as each change requires Vega or Vega-Lite to re-parse and render the output."),(0,i.kt)("p",null,"We already use some techinques to minimise unnecessary chatter if this option is enabled, such as ",(0,i.kt)("a",{parentName:"p",href:"https://css-tricks.com/debouncing-throttling-explained-examples/"},"debouncing text input"),", but it's still recommended that you apply your changes manually when ready, if editing a complex or data-intensive specification."),(0,i.kt)("h2",{id:"include-only-necessary-columns-and-measures"},"Include only Necessary Columns and Measures"),(0,i.kt)("p",null,"Any data that you add to the visual will have performance implications, specifically:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"The DAX query required by Power BI to generate the dataset for Deneb.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"The amount of resources needed by Deneb to process the dataset and for Vega or Vega-Lite to render the resulting output as per your specification.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Creating a row context with lower granularity than you actually need, which can make producing the desired output more challenging."))),(0,i.kt)("p",null,"Therefore, only add the columns and measures (and filter context) that your visual needs to communicate its message."),(0,i.kt)("h2",{id:"the-performance-tuning-property-menu"},"The Performance Tuning Property Menu"),(0,i.kt)("p",null,"The ",(0,i.kt)("strong",{parentName:"p"},"Performance Tuning")," menu in the Power BI format pane is used to expose additional properties that you can use to alter performance of your specification. Where possible, these properties are set to what makes the most sense for optimal performance."),(0,i.kt)("h3",{id:"recalculate-during-resize"},"Recalculate During Resize"),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"OFF By Default")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"})),(0,i.kt)("p",null,"Due to the dynamic nature of Power BI visual containers, any change to the sizing can trigger an update to a visual's logic and this can cause your visual specification to get re-calculated during the process. This may not be noticeable for visuals that use a small amount of marks, but for those that are more complex, this might create more overhead than you need for something you don't do frequently."),(0,i.kt)("p",null,"If enabled, the ",(0,i.kt)("strong",{parentName:"p"},"Recalculate during resize")," property will continue to calculate any changes to the specification while a visual is in the process of being resized. If disabled, Deneb will delay any further updates until you have completed the resize operation by releasing the mouse button, e.g.:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"recalculate-during-resize.gif.",src:n(6323).Z,title:"Our raincloud plot example contains many data points and calculations, which can be computationally expensive if resizing the visual container. By turning off the 'Recalculate during resize' property, you can delay any calculations until you have finished resizing your visual."})))}d.isMDXComponent=!0},6323:function(e,t,n){t.Z=n.p+"assets/images/recalculate-during-resize-cb1bbd9ca067830e787d9edd4ffb24af.gif"}}]);