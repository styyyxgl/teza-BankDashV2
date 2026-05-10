import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "~/config/firebase";
import type {
  BankCard,
  Currency,
  CardType,
  BankName,
} from "~/types/bank-card.type";
import { MAX_CARDS_PER_USER } from "~/constants/max-cards-per-user";

export const cardService = {
  generateCardNumber(): string {
    const bin = "414720";
    let partialNumber = bin;

    for (let i = 0; i < 9; i++) {
      partialNumber += Math.floor(Math.random() * 10).toString();
    }

    // Luhn number
    const checkDigit = this.calculateLuhnCheckDigit(partialNumber);

    return partialNumber + checkDigit;
  },

  calculateLuhnCheckDigit(number: string): string {
    const digits = number.split("").map(Number).reverse();

    let sum = 0;

    for (let i = 0; i < digits.length; i++) {
      let digit = digits[i];

      if (i % 2 === 0) {
        digit *= 2;

        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
    }

    return ((10 - (sum % 10)) % 10).toString();
  },

  generateExpirationDate(): string {
    const date = new Date();
    const randomYears = Math.floor(Math.random() * 3) + 1;

    date.setFullYear(date.getFullYear() + randomYears);

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    return `${month}/${year}`;
  },

  async createCard(
    userId: string,
    name: string,
    cardType: CardType,
    bank: BankName,
    currency: Currency = "UAH",
  ): Promise<BankCard> {
    const cardsRef = collection(db, "cards");
    const q = query(cardsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size >= MAX_CARDS_PER_USER) {
      throw new Error(
        `You cannot have more than ${MAX_CARDS_PER_USER} cards.`,
      );
    }

    const newCardNumber = this.generateCardNumber();
    const expirationDate = this.generateExpirationDate();

    const newCard: BankCard = {
      id: newCardNumber,
      userId,
      name,
      balance: 10000,
      currency,
      cardType,
      bank,
      expirationDate,
      createdAt: Date.now(),
    };

    await setDoc(doc(db, "cards", newCardNumber), newCard);

    return newCard;
  },

  async getUserCards(userId: string): Promise<BankCard[]> {
    const cardsRef = collection(db, "cards");
    const q = query(cardsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => doc.data() as BankCard);
  },
};