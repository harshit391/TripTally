async function hashString(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

function generateSessionToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

function createSession(userId) {
    const sessionToken = generateSessionToken();
    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    const filtered = sessions.filter(s => s.userId !== userId);
    filtered.push({ token: sessionToken, userId: userId });
    localStorage.setItem('sessions', JSON.stringify(filtered));
    document.cookie = `token=${sessionToken};path=/`;
    return sessionToken;
}

function getSessionUserId() {
    const cookie = document.cookie;
    if (!cookie) return null;

    const tokenMatch = cookie.split(';').find(c => c.trim().startsWith('token='));
    if (!tokenMatch) return null;

    const sessionToken = tokenMatch.split('=')[1];
    if (!sessionToken) return null;

    const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
    const session = sessions.find(s => s.token === sessionToken);
    return session ? session.userId : null;
}

function clearSession() {
    const cookie = document.cookie;
    if (cookie) {
        const tokenMatch = cookie.split(';').find(c => c.trim().startsWith('token='));
        if (tokenMatch) {
            const sessionToken = tokenMatch.split('=')[1];
            if (sessionToken) {
                const sessions = JSON.parse(localStorage.getItem('sessions') || '[]');
                const filtered = sessions.filter(s => s.token !== sessionToken);
                localStorage.setItem('sessions', JSON.stringify(filtered));
            }
        }
    }
    document.cookie = 'token=;path=/;';
}
