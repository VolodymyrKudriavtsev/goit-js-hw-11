var e=refs={};const o=new URLSearchParams({key:"31991210-5d8d315bab6d2995c6cf86716",q:"cats",image_type:"photo",orientation:"horizontal",safesearch:!0});console.log(e),o.set("q","searchBoxValue"),fetch(`https://pixabay.com/api/?${o}`).then((e=>{if(e.ok)return e.json();throw new Error})).then((e=>console.log(e))).catch((e=>e));
//# sourceMappingURL=index.5e821d58.js.map
