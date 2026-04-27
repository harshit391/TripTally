function generateSalt() {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hashString(message, salt) {
    const input = salt ? salt + message : message;
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
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
    const sessions = safeParseJSON(localStorage.getItem('sessions')) || [];
    const filtered = sessions.filter(s => s.userId !== userId);
    const expiresAt = Date.now() + (7 * 24 * 60 * 60 * 1000); // 7 days
    filtered.push({ token: sessionToken, userId: userId, expiresAt: expiresAt });
    localStorage.setItem('sessions', JSON.stringify(filtered));
    document.cookie = `token=${sessionToken};path=/;max-age=${7 * 24 * 60 * 60};SameSite=Strict`;
    return sessionToken;
}

function getSessionUserId() {
    const cookie = document.cookie;
    if (!cookie) return null;

    const tokenMatch = cookie.split(';').find(c => c.trim().startsWith('token='));
    if (!tokenMatch) return null;

    const sessionToken = tokenMatch.split('=')[1];
    if (!sessionToken) return null;

    const sessions = safeParseJSON(localStorage.getItem('sessions')) || [];
    const session = sessions.find(s => s.token === sessionToken);

    if (!session) return null;

    // Check expiry
    if (session.expiresAt && Date.now() > session.expiresAt) {
        // Remove expired session
        const filtered = sessions.filter(s => s.token !== sessionToken);
        localStorage.setItem('sessions', JSON.stringify(filtered));
        document.cookie = 'token=;path=/;max-age=0;SameSite=Strict';
        return null;
    }

    return session.userId;
}

function clearSession() {
    const cookie = document.cookie;
    if (cookie) {
        const tokenMatch = cookie.split(';').find(c => c.trim().startsWith('token='));
        if (tokenMatch) {
            const sessionToken = tokenMatch.split('=')[1];
            if (sessionToken) {
                const sessions = safeParseJSON(localStorage.getItem('sessions')) || [];
                const filtered = sessions.filter(s => s.token !== sessionToken);
                localStorage.setItem('sessions', JSON.stringify(filtered));
            }
        }
    }
    document.cookie = 'token=;path=/;max-age=0;SameSite=Strict';
}

function safeParseJSON(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return null;
    }
}
