export interface CreateNoteDTO {
  title: string;
  description: string;
  content: string;
  userId: number;
}

export interface UpdateNoteDTO {
  title?: string;
  description?: string;
  content?: string;
}
