// 1. 페이지 전환 함수 (기본)
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => {
        p.classList.remove('active');
        // 타이머 페이지 외에는 display none으로 확실히 숨김
        if (p.id !== 'timer-page') p.style.display = 'none';
    });

    const target = document.getElementById(pageId);
    if (!target) return;

    target.classList.add('active');

    const sidebar = document.getElementById('main-sidebar');
    if (pageId === 'timer-page') {
        sidebar.style.display = 'none';
        target.style.display = 'flex'; // 타이머는 flex 유지
    } else {
        sidebar.style.display = 'flex';
        target.style.display = 'block'; // 일반 페이지는 block
    }
}

// [복구] 카운트다운 화면 어디든 클릭하면 이동하는 함수
function goToMeal() {
    showPage('meal-page');
}

// 2. 카운트다운 로직 (생략 없이 유지)
const targetDate = new Date("March 14, 2027 00:00:00").getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);
    const clockEl = document.getElementById("clock");
    if(clockEl) clockEl.innerHTML = `${d}d ${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}
setInterval(updateCountdown, 1000);

// 3. 댓글 삭제 기능 (유지)
function deleteComment(index) {
    if(confirm("이 응원을 삭제할까요?")) {
        let comments = JSON.parse(localStorage.getItem('woozi_comments') || '[]');
        comments.splice(index, 1);
        localStorage.setItem('woozi_comments', JSON.stringify(comments));
        loadComments();
    }
}

function loadComments() {
    const list = document.getElementById('comment-list');
    if(!list) return;
    const comments = JSON.parse(localStorage.getItem('woozi_comments') || '[]');
    list.innerHTML = comments.map((c, index) => `
        <div class="comment-item">
            <button class="delete-btn" onclick="deleteComment(${index})">삭제</button>
            <p>${c.text}</p>
            <small style="color:#aaa">${c.date}</small>
        </div>
    `).join('');
}
window.onload = loadComments;