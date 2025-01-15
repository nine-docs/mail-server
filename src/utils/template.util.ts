import * as fs from 'fs';
import * as path from 'path';

export const readHtmlFile = (filePath: string): string | null => {
  try {
    const templatePath = path.join(__dirname, '../templates', filePath); // 경로 수정 (상위 두 폴더)
    return fs.readFileSync(templatePath, 'utf-8');
  } catch (error) {
    console.error('HTML 파일 읽기 실패:', error);
    return null;
  }
};

export const replacePlaceholders = (
  html: string,
  data: { [key: string]: string },
): string => {
  let replacedHtml = html;
  for (const key in data) {
    const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
    replacedHtml = replacedHtml.replace(regex, data[key]);
  }
  return replacedHtml;
};
