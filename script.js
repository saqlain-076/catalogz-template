const photos = [
  {
    id: 'clocks',
    title: 'Clocks',
    date: '18 Oct 2020',
    views: '9,906',
    category: 'objects',
    image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=900&q=80',
    description: 'A modern composition of timepieces and light, captured with a crisp editorial feel.'
  },
  {
    id: 'plants',
    title: 'Plants',
    date: '14 Oct 2020',
    views: '16,100',
    category: 'nature',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
    description: 'Fresh greenery and soft daylight give this image a calm, balanced atmosphere.'
  },
  {
    id: 'morning',
    title: 'Morning',
    date: '12 Oct 2020',
    views: '12,460',
    category: 'travel',
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80',
    description: 'Morning light on a quiet road, perfect for storytelling and cinematic mood.'
  },
  {
    id: 'pinky',
    title: 'Pinky',
    date: '10 Oct 2020',
    views: '11,402',
    category: 'people',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    description: 'Bright color and gentle expression turn this portrait into a memorable moment.'
  },
  {
    id: 'hangers',
    title: 'Hangers',
    date: '24 Sep 2020',
    views: '16,008',
    category: 'objects',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
    description: 'Everyday objects arranged with care create rhythm and texture in the frame.'
  },
  {
    id: 'perfumes',
    title: 'Perfumes',
    date: '20 Sep 2020',
    views: '12,860',
    category: 'objects',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=80',
    description: 'A delicate study of packaging, color, and design details in soft light.'
  },
  {
    id: 'bus',
    title: 'Bus',
    date: '16 Sep 2020',
    views: '10,900',
    category: 'travel',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80',
    description: 'Urban motion and layered colors bring life to this city scene.'
  },
  {
    id: 'new-york',
    title: 'New York',
    date: '12 Sep 2020',
    views: '11,300',
    category: 'travel',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
    description: 'A skyline moment that captures the energy of the city at dusk.'
  }
];

const state = {
  query: '',
  page: 1,
  perPage: 6
};

function getFilteredPhotos() {
  const query = state.query.trim().toLowerCase();
  return photos.filter((photo) => {
    const matchesQuery = !query || photo.title.toLowerCase().includes(query) || photo.category.toLowerCase().includes(query);
    return matchesQuery;
  });
}

function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  const pageInfo = document.getElementById('pageInfo');
  if (!grid) return;

  const filtered = getFilteredPhotos();
  const totalPages = Math.max(1, Math.ceil(filtered.length / state.perPage));
  state.page = Math.min(state.page, totalPages);

  const start = (state.page - 1) * state.perPage;
  const pagedPhotos = filtered.slice(start, start + state.perPage);

  grid.innerHTML = '';
  if (!pagedPhotos.length) {
    grid.innerHTML = '<p class="hero-copy">No photos matched your search.</p>';
    pageInfo.textContent = 'No results';
    renderPagination(totalPages);
    return;
  }

  pagedPhotos.forEach((photo) => {
    const article = document.createElement('article');
    article.className = 'card';
    article.innerHTML = `
      <img class="card-image" src="${photo.image}" alt="${photo.title}" />
      <div class="card-body">
        <h3>${photo.title}</h3>
        <div class="card-meta">${photo.date} • ${photo.views} views</div>
        <a class="card-link" href="photo-detail.html?photo=${photo.id}">View more</a>
      </div>
    `;
    grid.appendChild(article);
  });

  pageInfo.textContent = `Page ${state.page} of ${totalPages}`;
  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  const container = document.getElementById('pagination');
  if (!container) return;

  container.innerHTML = '';
  const prevButton = document.createElement('button');
  prevButton.textContent = 'Previous';
  prevButton.onclick = () => {
    if (state.page > 1) {
      state.page -= 1;
      renderGallery();
    }
  };
  container.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i += 1) {
    const button = document.createElement('button');
    button.textContent = i;
    button.className = i === state.page ? 'active' : '';
    button.onclick = () => {
      state.page = i;
      renderGallery();
    };
    container.appendChild(button);
  }

  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.onclick = () => {
    if (state.page < totalPages) {
      state.page += 1;
      renderGallery();
    }
  };
  container.appendChild(nextButton);
}

function initHomePage() {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  if (!searchInput || !searchButton) return;

  searchInput.addEventListener('input', (event) => {
    state.query = event.target.value;
    state.page = 1;
    renderGallery();
  });

  searchButton.addEventListener('click', () => {
    state.page = 1;
    renderGallery();
  });

  renderGallery();
}

function initDetailPage() {
  const detailContent = document.getElementById('detailContent');
  if (!detailContent) return;

  const params = new URLSearchParams(window.location.search);
  const photoId = params.get('photo');
  const photo = photos.find((item) => item.id === photoId) || photos[0];

  detailContent.innerHTML = `
    <img src="${photo.image}" alt="${photo.title}" />
    <div class="detail-content">
      <h2>${photo.title}</h2>
      <p><strong>Date:</strong> ${photo.date}</p>
      <p><strong>Views:</strong> ${photo.views}</p>
      <p><strong>Category:</strong> ${photo.category}</p>
      <p>${photo.description}</p>
    </div>
  `;
}

if (document.body.dataset.page === 'detail') {
  initDetailPage();
} else {
  initHomePage();
}
