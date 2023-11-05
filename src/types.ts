// Event Interface
export interface Content {
  value: string;
}

export interface ContentItem {
  content: Content[];
}

export interface EventItem {
  fields: {
    title: string;
    description: {
      content: ContentItem[];
    };
    location: string;
    rsvpLink: string;
    expired: boolean;
    date: string;
  };
}

export interface Event {
  title: string;
  content: string;
  location: string;
  rsvpLink: string;
  expired: boolean;
  date: string;
  academicConsultant: string;
}

// Review Session Interface
export interface ReviewSessionItem {
  fields: {
    title: string;
    description: {
      content: ContentItem[];
    };
    location: string;
    rsvpLink: string;
    expired: boolean;
    date: string;
    academicConsultant: string;
  };
}

export interface ReviewSession {
  title: string;
  content: string;
  location: string;
  rsvpLink: string;
  expired: boolean;
  date: string;
  academicConsultant: string;
}
