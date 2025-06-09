export const isValidDate = (dateString: string): boolean => {
   const [day, month, year] = dateString.split('/').map(Number);
   if (!day || !month || !year) {return false;}

   const inputDate = new Date(year, month - 1, day);
   const today = new Date();

   // Zera horas pra comparar apenas data
   today.setHours(0, 0, 0, 0);
   inputDate.setHours(0, 0, 0, 0);

   return (
     inputDate.getFullYear() === year &&
     inputDate.getMonth() === month - 1 &&
     inputDate.getDate() === day &&
     inputDate >= today // Verifica se o dia é hoje
   );
 };


 // Está implementado para aceitar datas de hoje e futuras.
