
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Elementy DOM
const form = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');

// Klucz API Pixabay
const API_KEY = '45947467-1fb23e21d26a094164d331d1f'; // Wklej swój klucz API

// Obsługa formularza
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = document.getElementById('query').value.trim();

  // Walidacja pustego zapytania
  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    const images = response.data.hits;

    hideLoader();

    // Brak wyników
    if (images.length === 0) {
      iziToast.info({
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      gallery.innerHTML = '';
      return;
    }

    displayImages(images);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
    hideLoader();
  }
});

// Wyświetlanie obrazów
function displayImages(images) {
  gallery.innerHTML = images
    .map(
      (img) => `
      <a href="${img.largeImageURL}" class="gallery-item">
        <img src="${img.webformatURL}" alt="${img.tags}" />
        <div class="info">
          <p>Likes: ${img.likes}</p>
          <p>Views: ${img.views}</p>
          <p>Comments: ${img.comments}</p>
          <p>Downloads: ${img.downloads}</p>
        </div>
      </a>`
    )
    .join('');

  refreshLightbox(); // Odświeżenie galerii SimpleLightbox
}

// Wyczyść galerię
function clearGallery() {
  gallery.innerHTML = '';
}

// Pokaż loader
function showLoader() {
  loader.classList.remove('hidden');
}

// Ukryj loader
function hideLoader() {
  loader.classList.add('hidden');
}

// Odświeżanie SimpleLightbox
function refreshLightbox() {
  const lightbox = new SimpleLightbox('.gallery-item', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}


// Użycie Axios - Axios obsługuje żądania do API Pixabay, aby pobrać obrazy na podstawie wyszukiwania.
  
// iziToast - Obsługuje powiadomienia dla błędów i informuje, gdy zapytanie nie zwraca wyników.
  
//  SimpleLightbox - Odpowiada za wyświetlanie powiększonych obrazów w modalu. 
//                   Każde dodanie nowych elementów do galerii wymaga odświeżenia galerii za pomocą lightbox.refresh().
// Loader - Pojawia się podczas wysyłania zapytania i znika po zakończeniu pobierania danych.

// Jak to działa:

// 1.Użytkownik wprowadza zapytanie do formularza wyszukiwania.

// 2.Aplikacja wyświetla wskaźnik ładowania i wysyła zapytanie do API Pixabay.

// 3.Jeśli są wyniki, obrazy są wyświetlane w galerii.Każdy obraz jest owinięty w link, który otwiera się w SimpleLightbox po kliknięciu.

// 4.Jeśli nie ma wyników, wyświetlany jest komunikat o błędzie.

// 5.Po zakończeniu pobierania wskaźnik ładowania znika.

// Wymagania:

// Wklej swój klucz API w miejsce YOUR_PIXABAY_API_KEY.

// Upewnij się, że masz zainstalowane odpowiednie biblioteki (axios, izitoast, simplelightbox) w swoim projekcie.