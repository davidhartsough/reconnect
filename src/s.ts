function shuffle(items: string[]): string[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getTodaysDate(): string {
  return new Date().toISOString().split("T")[0];
}

const DAILY_STATE_KEY = "daily_state";
const SEQUENCE_KEY = "sequence";
const FRIENDS_KEY = "friends";

type DailyState = {
  index: number;
  date: string;
  prev: string;
};

const initialState: DailyState = {
  index: 0,
  date: getTodaysDate(),
  prev: "",
};

function getDailyState(): DailyState {
  const state = localStorage.getItem(DAILY_STATE_KEY);
  return state ? JSON.parse(state) : initialState;
}

function setDailyState(state: DailyState) {
  localStorage.setItem(DAILY_STATE_KEY, JSON.stringify(state));
}

function getSequence(): string[] {
  const items = localStorage.getItem(SEQUENCE_KEY);
  return items ? JSON.parse(items) : [];
}

function setSequence(items: string[]) {
  localStorage.setItem(SEQUENCE_KEY, JSON.stringify(items));
}

function saveItems(items: string[]) {
  setSequence(shuffle(items));
}

export function getTodaysItem(): string {
  const { index, date, prev } = getDailyState();
  const today = getTodaysDate();
  const items = getSequence();
  if (date === today) {
    if (index === 0 && prev === items[0]) {
      setDailyState({ index: 1, date, prev });
    }
    return prev;
  }
  if (index === items.length) {
    let newShuffle, first;
    do {
      newShuffle = shuffle(items);
      first = newShuffle[0];
    } while (first === prev);
    setSequence(newShuffle);
    setDailyState({ index: 0, date: today, prev: first });
    return first;
  }
  if (index === 0 && prev === items[0]) {
    const curr = items[1];
    setDailyState({ index: 1, date: today, prev: curr });
    return curr;
  }
  const curr = items[index];
  setDailyState({ index: index + 1, date: today, prev: curr });
  return curr;
}

export function getFriends(): string[] {
  const list = localStorage.getItem(FRIENDS_KEY);
  return list ? JSON.parse(list) : [];
}

export function setFriends(friends: string[]) {
  const next = friends.map((n) => n.trim()).filter((n) => n);
  const prev = getFriends();
  if (next.length === prev.length && prev.every((v, i) => v === next[i])) {
    return;
  }
  localStorage.setItem(FRIENDS_KEY, JSON.stringify(next));
  saveItems(next);
  const today = getTodaysDate();
  const items = getSequence();
  setDailyState({ index: 0, date: today, prev: items[0] });
}

const prompts = [
  "Talk with _.",
  "Learn more about _.",
  "Ask _ a question.",
  "Make plans with _.",
  "Thank _.",
  "Compliment _.",
  "Celebrate _.",
  "Share something with _.",
];

export function getPrompts(name: string) {
  const { index } = getDailyState();
  const list = index === 0 ? prompts : shuffle(prompts);
  return list.map((p) => p.replace("_", name));
}
