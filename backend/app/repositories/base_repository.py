from sqlalchemy.orm import Session

# create    = insert record 
# get_all   = fetch all     
# get_by_id = fetch one     
# delete    = remove record 


class BaseRepository:

    def __init__(self, model):
        self.model = model

    def create(self, db: Session, **kwargs):
        obj = self.model(**kwargs)
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj

    def get_all(self, db: Session):
        return db.query(self.model).all()

    def get_by_id(self, db: Session, obj_id: int):
        return db.query(self.model).filter(self.model.id == obj_id).first()

    def delete(self, db: Session, obj_id: int):
        obj = self.get_by_id(db, obj_id)
        if obj:
            db.delete(obj)
            db.commit()
        return obj