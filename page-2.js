import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as a,a as l,S as c}from"./assets/vendor-u8rapaCG.js";const m=document.getElementById("search-form"),r=document.getElementById("gallery"),s=document.getElementById("loader"),d="45947467-1fb23e21d26a094164d331d1f";m.addEventListener("submit",async t=>{t.preventDefault();const e=document.getElementById("query").value.trim();if(!e){a.error({title:"Error",message:"Please enter a search term!"});return}g(),h();try{const o=(await l.get(`https://pixabay.com/api/?key=${d}&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&safesearch=true`)).data.hits;if(n(),o.length===0){a.info({message:"Sorry, there are no images matching your search query. Please try again!"}),r.innerHTML="";return}p(o)}catch{a.error({title:"Error",message:"Something went wrong. Please try again later."}),n()}});function p(t){r.innerHTML=t.map(e=>`
      <a href="${e.largeImageURL}" class="gallery-item">
        <img src="${e.webformatURL}" alt="${e.tags}" />
        <div class="info">
          <p>Likes: ${e.likes}</p>
          <p>Views: ${e.views}</p>
          <p>Comments: ${e.comments}</p>
          <p>Downloads: ${e.downloads}</p>
        </div>
      </a>`).join(""),y()}function g(){r.innerHTML=""}function h(){s.classList.remove("hidden")}function n(){s.classList.add("hidden")}function y(){new c(".gallery-item",{captionsData:"alt",captionDelay:250}).refresh()}
//# sourceMappingURL=page-2.js.map
