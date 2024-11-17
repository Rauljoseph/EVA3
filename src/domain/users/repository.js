export class IUserRepository{
  save(user) {
      throw new Error("Método guardar no implementado.");
  }
  
  getUserById(id) {
      throw new Error("Método obtener por id no implementado.");
  }
  
  getAllUser() {
      throw new Error("Método obtener todos los usuarios no implementado.");
  }
  
  updateUser(id, user) {
      throw new Error("Método actualizar no implementado.");
  }
  
  deleteUser(id) {
      throw new Error("Método eliminar no implementado.");
  }

  findByEmail(email){
    throw new Error ("Metodo no implementado.")
  }
      
      
}