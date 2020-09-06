const imageContainer=document.getElementById('image-container');
const loader=document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


//unsplash API
const count=10;
const apiKey='y3wCeh3ZJrUhysQ259lH4ZIlRA0DYQhY4rVhCRlkucQ';
const apiUrl=`https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;


function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
      ready = true;
      loader.hidden = true;
    }
  }

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }


function displayPhotos(){
    imagesLoaded = 0;
  totalImages = photosArray.length;
    //run function for each array
    photosArray.forEach((photo) => {
     // Create <a> to link to full photo
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
//append image
item.appendChild(img);
imageContainer.appendChild(item);
    });

}


// API Function
async function getPhotos(){
    try{
        const response= await fetch(apiUrl);
      photosArray= await response.json();
       displayPhotos();
    }
    catch(error){
            console.log(error)
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
      ready = false;
      getPhotos();
    }
  });
getPhotos();