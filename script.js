function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageId);
    if(target) target.classList.add('active');

    const sidebar = document.getElementById('main-sidebar');
    // 타이머 페이지에서는 사이드바 숨김
    if (pageId === 'timer-page') {
        sidebar.style.display = 'none';
    } else {
        sidebar.style.display = 'flex';
    }
}

// 카운트다운 로직
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

function goToMeal() {
    document.getElementById("timer-page").classList.remove("active");
    document.getElementById("meal-page").classList.add("active");

    // 사이드바 보이기
    document.getElementById("main-sidebar").style.display = "flex";
}

// 댓글 시스템 + 삭제 기능
function addComment() {
    const input = document.getElementById('comment-input');
    if (!input.value.trim()) return;
    const comments = JSON.parse(localStorage.getItem('woozi_comments') || '[]');
    comments.unshift({ text: input.value, date: new Date().toLocaleString() });
    localStorage.setItem('woozi_comments', JSON.stringify(comments));
    input.value = '';
    loadComments();
}

function deleteComment(index) {
    if(confirm("이 소중한 응원을 삭제할까요?")) {
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
