// 책 추가 기능
function addBook() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
  
    if (!title || !author || !isbn) {
      alert("모든 항목을 입력하세요.");
      return;
    }
  
    db.collection('books').add({
      title,
      author,
      isbn,
      available: true
    })
    .then(() => {
      alert('책이 추가되었습니다.');
      loadBooks();  // 책 목록 갱신
    })
    .catch((error) => {
      alert('오류가 발생했습니다: ' + error.message);
    });
  }
  
  // 책 목록 조회 기능
  function loadBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
  
    db.collection('books').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const book = doc.data();
          const li = document.createElement('li');
          li.textContent = `${book.title} (저자: ${book.author}, ISBN: ${book.isbn}) - ${book.available ? "대출 가능" : "대출 중"}`;
          bookList.appendChild(li);
        });
      })
      .catch((error) => {
        alert('오류가 발생했습니다: ' + error.message);
      });
  }
  
  // 책 검색 기능
  function searchBook() {
    const searchTitle = document.getElementById('searchTitle').value.trim();
    const searchResult = document.getElementById('searchResult');
    searchResult.innerHTML = '';
  
    if (!searchTitle) {
      alert("검색할 책 제목을 입력하세요.");
      return;
    }
  
    db.collection('books').where('title', '==', searchTitle).get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          searchResult.textContent = '해당 책이 없습니다.';
        } else {
          querySnapshot.forEach((doc) => {
            const book = doc.data();
            searchResult.textContent = `📖 책 있음: ${book.title} (저자: ${book.author}, ISBN: ${book.isbn}) - ${book.available ? "대출 가능" : "대출 중"}`;
          });
        }
      })
      .catch((error) => {
        alert('오류가 발생했습니다: ' + error.message);
      });
  }
  
  // 페이지 로드시 책 목록 불러오기
  window.onload = loadBooks;
  