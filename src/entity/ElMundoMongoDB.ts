import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class ElMundoMongoDB {
  @ObjectIdColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  url: string;

  constructor(id: string, title: string, url: string) {
    this.id = id;
    this.title = title;
    this.url = url;
  }
}
