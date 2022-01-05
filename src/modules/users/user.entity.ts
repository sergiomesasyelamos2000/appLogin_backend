import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { User } from 'shared/interface/user.model';
import { crypt } from 'src/utilities/Utils';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity implements User {
  @ApiProperty({ example: '1234' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'prueba@gmail.com' })
  @Column('varchar')
  email: string;

  @ApiProperty({ example: 'Sergio' })
  @Column('varchar')
  name: string;

  @ApiProperty({ example: 'Contrasena' })
  @Column('varchar')
  password: string;

  @ApiProperty({ example: 'Mesas' })
  @Column('varchar')
  surname: string;

  @BeforeInsert()
  async hashPassword() {
    await crypt(this.password).then((password) => (this.password = password));
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compareSync(password, this.password);
  }
}
