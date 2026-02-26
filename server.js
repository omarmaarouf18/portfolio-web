const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware لتنظيف البيانات وفهم الـ JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, '/'))); // عشان يفتح ملفات الـ HTML والـ CSS

// Endpoint لجلب بياناتك الشخصية
app.get('/api/data', (req, res) => {
    res.sendFile(path.join(__dirname, 'data.json'));
});

// Endpoint لاستقبال وحفظ الرسايل (POST)
app.post('/api/messages', (req, res) => {
    const { name, email, message } = req.body;
    
    // حماية بسيطة: التأكد من وجود البيانات
    if (!name || !email || !message) {
        return res.status(400).send({ error: 'All fields are required' });
    }

    const newMessage = {
        name,
        email,
        message,
        date: new Date().toLocaleString('en-GB')
    };

    const filePath = path.join(__dirname, 'messages.json');

    // قراءة الملف القديم ثم إضافة الرسالة الجديدة
    fs.readFile(filePath, 'utf8', (err, data) => {
        let messages = [];
        if (!err && data) {
            messages = JSON.parse(data);
        }
        
        messages.push(newMessage);

        fs.writeFile(filePath, JSON.stringify(messages, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).send({ error: 'Failed to save message' });
            }
            res.status(201).send({ status: 'Success', message: 'Message stored securely' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`[+] Portfolio Server is running on http://localhost:${PORT}`);
    console.log(`[!] Ready to receive secure messages...`);
});