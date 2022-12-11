var e=refs={searchForm:document.querySelector(".search-form"),submitButton:document.querySelector(".let-search")};const t=new URLSearchParams({key:"31991210-5d8d315bab6d2995c6cf86716",q:"cats",image_type:"photo",orientation:"horizontal",safesearch:!0});console.log(e);let o="",r=[];console.dir(e.submitButton);e.searchForm.addEventListener("submit",(s=>{var a;s.preventDefault(),e.submitButton.disabled=!0,e.submitButton.classList.toggle("disabled"),
//!   refs.iconSpinner.classList.toggle('is-hidden');
//!   refs.iconSearch.classList.toggle('is-hidden');
o=s.target.elements.searchQuery.value.trim(),(a=o,t.set("q",a),fetch(`https://pixabay.com/api/?${t}`).then((e=>{if(e.ok)return e.json();throw new Error})).catch((e=>e))).then((({hits:e})=>{r=e,console.log(r)}))}));
//# sourceMappingURL=index.de29427d.js.map
