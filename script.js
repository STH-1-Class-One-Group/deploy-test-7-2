function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageId);
    target.classList.add('active');

    // 메인 카운트다운(timer-page)일 때는 사이드바 숨기기
    const sidebar = document.getElementById('main-sidebar');
    if (pageId === 'timer-page') {
        sidebar.style.display = 'none';
        target.style.display = 'flex';
    } else {
        sidebar.style.display = 'flex';
        target.style.display = 'block';
    }
}

// 댓글 저장 및 불러오기
function addComment() {
    const input = document.getElementById('comment-input');
    if (!input.value.trim()) return;

    const comments = JSON.parse(localStorage.getItem('woozi_comments') || '[]');
    comments.unshift({ text: input.value, date: new Date().toLocaleString() });
    localStorage.setItem('woozi_comments', JSON.stringify(comments));
    
    input.value = '';
    loadComments();
}

function loadComments() {
    const list = document.getElementById('comment-list');
    const comments = JSON.parse(localStorage.getItem('woozi_comments') || '[]');
    list.innerHTML = comments.map(c => `
        <div class="comment-item">
            <p>${c.text}</p>
            <small style="color:#999">${c.date}</small>
        </div>
    `).join('') || '<p>첫 응원을 남겨보세요!</p>';
}

// 초기화
window.addEventListener('DOMContentLoaded', () => {
    loadComments();
    updateCountdown();
    setInterval(updateCountdown, 1000);
});