import {Lesson, Step} from './types';

// -------- String Formatters

export function camelCase(s: string) {
  if (!s) return;
  if (!s.trim().includes(' ')) return s.trim().toLowerCase();
  const strArr = s.split(' ');

  let camelCase = strArr[0].toLowerCase();

  for (let i = 1; i < strArr.length; i++) {
    if (strArr[i]) {
      camelCase += capitalizeFirstLetter(strArr[i]);
    }
  }
  return camelCase;
}

export function capitalizeFirstLetter(s: string) {
  if (!s || s.length <= 1) return s;

  return s.charAt(0).toUpperCase() + s.substring(1, s.length).toLowerCase();
}

export function capitalizeAllFirstLetters(s: string) {
  if (!s) return s;
  if (!s.trim().includes(' ')) return capitalizeFirstLetter(s);

  let capitalised = '';
  for (const word of s.split(' ')) {
    capitalised += capitalizeFirstLetter(word) + ' ';
  }
  return capitalised;
}

export function truncateText(text: string, charLimit: number, ellipsis = false) {
  if (!text) return text;

  let newText = text.substring(0, charLimit);

  if (text.length > charLimit && ellipsis) {
    newText = newText.substring(0, newText.length - 1) + '...';
  }

  return newText;
}

// -------- Practice Time Formatters:

export function getPracticeTime(practiceMin: number, practiceMax: number) {
  if (practiceMin === 0 && practiceMax === 0) return '';

  if (practiceMin === practiceMax) return '' + practiceMin;

  if (practiceMin > practiceMax && practiceMax > 0) return `${practiceMin} - ${practiceMin + practiceMax}`;

  if (practiceMin > practiceMax) return '' + practiceMin;

  return `${practiceMin} - ${practiceMax}`;
}

export function getTotalPracticeTime(steps: Step[]) {
  let min = 0;
  let max = 0;
  for (const step of steps) {
    min += step.practiceMin;
    max += step.practiceMax;
  }
  return getPracticeTime(min, max);
}

export function readableLessonType(type: string) {
  return capitalizeAllFirstLetters(type.replaceAll('_', ' '));
}

// -------- Login Utility methods:

export function getUserEmail() {
  const lb = JSON.parse(sessionStorage.getItem('lessonbuilder') ?? '{}');
  if (lb && lb.email) {
    return lb.email;
  }
}

export function getUserName() {
  const lb = JSON.parse(sessionStorage.getItem('lessonbuilder') ?? '{}');
  if (lb && lb.username) {
    return lb.username;
  }
}

export function isLoggedIn() {
  const user = JSON.parse(sessionStorage.getItem('lessonbuilder') ?? '{}');
  if (user.email && user.username) {
    return true;
  }

  return false;
}

// -------- File renaming helpers for predictable filenames:

export function renameFileFromFileList(name: string, img: FileList) {
  const newName = name.replaceAll(' ', '_').trim() + '_';
  const file = img[0];
  const blob = file.slice(0, file.size, file.type);
  const newFile = new File([blob], newName + file.name, {type: file.type});
  return newFile;
}

export function renameFile(name: string, file: File) {
  const extension = file.name.substring(file.name.length - 4, file.name.length);
  const blob = file.slice(0, file.size, file.type);
  const newFile = new File([blob], name + extension, {type: file.type});
  return newFile;
}

// -------- UI Helpers:

export function setSelectValue(id: string, value: string) {
  const element = document.getElementById(id) as HTMLInputElement;
  if (element) {
    element.value = '' + value;
  }
}

export function setTextInputvalue(id: string, value: string) {
  const element = document.getElementById(id) as HTMLInputElement;
  if (element) {
    element.value = '' + value;
    return;
  }
}

export function unCheckSideNav() {
  const checkedRadio = document.querySelector('input[name="navOptions"]:checked') as HTMLInputElement;
  if (checkedRadio) {
    checkedRadio.checked = false;
  }
}

// -------- API Response to Type converters:

export function convertResponseToLessons(response: any): Lesson[] {
  if (response && response.lessons) {
    for (const lesson of response.lessons) {
      const steps = JSON.parse(lesson.steps);
      lesson.steps = steps;
    }
  }

  const lessons = response.lessons.map((l: any) => {
    return {
      email: l.user_email,
      lessonID: l.lessonId,
      type: l.type,
      description: l.description,
      title: l.title,
      steps: l.steps,
    };
  });

  return lessons;
}
