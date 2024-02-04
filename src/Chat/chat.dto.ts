export namespace ChatDto {

  export type Message = {
    id: string; 
    user_id: string;
    text: string;
    createdAt: string;
  };

  export type Room = {
    room: {
      id: string;
      ad_id: string;
      author_id: string;
      user_id: string;
      created_at: string;
    }
    user: {
      id: string;
      name: string;
      avatar_url: string;
    }
  }
  
} 
