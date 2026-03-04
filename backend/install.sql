-- 1. Tabella Utenti (users)
CREATE TABLE users (
    username VARCHAR(50) PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabella Libri (books) - Include i dati di vendita
CREATE TABLE books (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    seller_username VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    isbn VARCHAR(13), 
    subject VARCHAR(100), 
    price DECIMAL(10, 2) NOT NULL,
    condition_status ENUM('nuovo', 'ottimo', 'buono', 'usato') DEFAULT 'buono',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Dati di vendita (NULL finché il libro non viene acquistato)
    buyer_username VARCHAR(50) DEFAULT NULL,
    sale_date TIMESTAMP NULL DEFAULT NULL,
    sale_price DECIMAL(10, 2) DEFAULT NULL,
    
    -- Vincoli di integrità
    FOREIGN KEY (seller_username) REFERENCES users(username) ON DELETE CASCADE,
    FOREIGN KEY (buyer_username) REFERENCES users(username) ON DELETE SET NULL
);

CREATE TABLE messages (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    sender_username VARCHAR(50) NOT NULL,
    receiver_username VARCHAR(50) NOT NULL,
    book_id INT NOT NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (sender_username) REFERENCES users(username) ON DELETE CASCADE,
    FOREIGN KEY (receiver_username) REFERENCES users(username) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE
);