!function(){var t=refs={searchForm:document.querySelector(".search-form"),submitButton:document.querySelector(".let-search")},e=new URLSearchParams({key:"31991210-5d8d315bab6d2995c6cf86716",q:"cats",image_type:"photo",orientation:"horizontal",safesearch:!0});console.log(t);var o="",r=[];console.dir(t.submitButton);t.searchForm.addEventListener("submit",(function(n){var a;n.preventDefault(),t.submitButton.disabled=!0,t.submitButton.classList.toggle("disabled"),
//!   refs.iconSpinner.classList.toggle('is-hidden');
//!   refs.iconSearch.classList.toggle('is-hidden');
o=n.target.elements.searchQuery.value.trim(),(a=o,e.set("q",a),fetch("https://pixabay.com/api/?".concat(e)).then((function(t){if(t.ok)return t.json();throw new Error})).catch((function(t){return t}))).then((function(t){var e=t.hits;r=e,console.log(r)}))}))}();
//# sourceMappingURL=index.ae44e805.js.map
