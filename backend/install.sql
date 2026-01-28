-- 1. Tabella Utenti (users)
-- Contiene i dati di chi accede al sito (sia venditori che acquirenti)
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Non salvare mai le password in chiaro
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabella Libri (books)
-- Rappresenta l'annuncio inserito dall'utente.
-- 'seller_id' collega il libro all'utente che lo ha messo in vendita.
CREATE TABLE books (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    seller_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    isbn VARCHAR(13), -- Importante per i libri scolastici
    subject VARCHAR(100), -- Materia (es. Matematica, Storia)
    price DECIMAL(10, 2) NOT NULL,
    condition_status ENUM('nuovo', 'ottimo', 'buono', 'usato') DEFAULT 'buono',
    is_available BOOLEAN DEFAULT TRUE, -- Diventa FALSE quando viene venduto
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 3. Tabella Libri Venduti (sold_books)
-- Registra la transazione. Collega il libro al venditore e all'acquirente.
CREATE TABLE sold_books (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT NOT NULL,
    seller_id INT NOT NULL,
    buyer_id INT NOT NULL,
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sale_price DECIMAL(10, 2) NOT NULL, -- Prezzo finale pattuito
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    FOREIGN KEY (seller_id) REFERENCES users(user_id),
    FOREIGN KEY (buyer_id) REFERENCES users(user_id)
);