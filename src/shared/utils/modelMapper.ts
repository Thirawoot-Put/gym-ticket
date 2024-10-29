import { ClassConstructor, plainToInstance } from 'class-transformer'

class Mapper {
  public toInstance<T>(cls: ClassConstructor<T>, plainObj: { [key: string]: any }) {
    return plainToInstance(cls, plainObj)
  }
}

export default Mapper
