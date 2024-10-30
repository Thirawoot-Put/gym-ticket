type ClassConstructor<T> = {
  new(): T;
};

class Mapper {
  public mapObjToCls<T>(cls: ClassConstructor<T>, plainObj: { [key: string]: any }) {
    const instance = new cls()

    Object.keys(plainObj).forEach((key) => {
      if (key in (instance as any))
        (instance as any)[key] = plainObj[key]
    })

    return instance
  }
}

export default Mapper
