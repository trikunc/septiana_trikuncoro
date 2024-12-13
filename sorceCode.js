class VendingMachine {
  constructor() {
    this.foodItems = {
      biskuit: 6000,
      chips: 8000,
      oreo: 10000,
      tango: 12000,
      cokelat: 15000,
    };
    this.coins = [2000, 5000, 10000, 20000, 50000];
    this.stock = {
      biskuit: 5,
      chips: 5,
      oreo: 5,
      tango: 5,
      cokelat: 5,
    };
    this.balance = 0;
  }

  displayItems() {
    console.log('Daftar Makanan:');
    for (const item in this.foodItems) {
      console.log(
        `${item}: Rp ${this.foodItems[item]} - Stok: ${this.stock[item]}`
      );
    }
  }

  promptUserForChoice() {
    let choice = null;
    while (true) {
      const choiceText = prompt(
        `Selamat datang di Vending Machine!\n\n` +
          `Daftar Makanan:\n` +
          `Biskuit: Rp 6000 - Stok: ${this.stock['biskuit']}\n` +
          `Chips: Rp 8000 - Stok: ${this.stock['chips']}\n` +
          `Oreo: Rp 10000 - Stok: ${this.stock['oreo']}\n` +
          `Tango: Rp 12000 - Stok: ${this.stock['tango']}\n` +
          `Cokelat: Rp 15000 - Stok: ${this.stock['cokelat']}\n\n` +
          `Saldo Anda: Rp ${this.balance}\n\n` +
          `Pilih makanan (Ketik 'selesai' untuk keluar):`
      ).toLowerCase();

      if (choiceText === 'selesai') {
        const change = this.returnChange();
        if (change > 0) {
          alert(`Terima kasih! Anda menerima kembalian sebesar Rp ${change}.`);
        }
        break;
      }

      if (choiceText in this.foodItems) {
        choice = choiceText;
        break;
      } else {
        alert('Item tidak tersedia.');
      }
    }

    return choice;
  }

  insertCoin(amount) {
    if (this.coins.includes(amount)) {
      this.balance += amount;
    } else {
      alert(
        'Uang tidak valid. Masukkan uang pecahan 2000, 5000, 10000, 20000, atau 50000.'
      );
    }
  }

  purchase(item) {
    if (this.foodItems[item]) {
      const price = this.foodItems[item];
      if (this.stock[item] > 0) {
        if (this.balance >= price) {
          this.balance -= price;
          this.stock[item] -= 1;
          console.log(
            `Anda telah membeli ${item}. Sisa saldo: Rp ${this.balance}`
          );
        } else {
          alert('Saldo tidak cukup.');
        }
      } else {
        alert(`${item} sedang habis.`);
      }
    } else {
      alert('Item tidak tersedia.');
    }
  }

  returnChange() {
    const change = this.balance;
    this.balance = 0;
    return change;
  }
}

// Contoh penggunaan mesin vending machine
const vendingMachine = new VendingMachine();

while (true) {
  const choice = vendingMachine.promptUserForChoice();

  if (choice === null) {
    break;
  }

  const amount = parseInt(prompt(
        `Masukkan uang:\n\n` +
          `Daftar Uang:\n` +
          `2000, 5000, 10000, 20000, atau 50000`
      ));
  vendingMachine.insertCoin(amount);
  vendingMachine.purchase(choice);
}