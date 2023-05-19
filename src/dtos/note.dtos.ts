export interface CreateNoteDTO {
  title: string;
  description: string;
  content: string;
  isPublic: number;
  userId: number;
}

export interface UpdateNoteDTO {
  title?: string;
  description?: string;
  content?: string;
  isPublic?: number;
}
