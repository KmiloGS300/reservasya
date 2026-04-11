import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeedService {

  constructor() {}

  getDemoReservations() {

    const nombres = ['Camila', 'Andrés', 'Valentina', 'Santiago', 'Laura', 'Daniel', 'Paula', 'Mateo'];
    const apellidos = ['Rodríguez', 'Martínez', 'Gómez', 'López', 'Torres', 'Rojas', 'Herrera', 'Castro'];
    const dominios = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];

    const horasBase = [
      '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
      '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
    ];

    const reservas: any[] = [];

    // 🔥 CREAR 3-4 DÍAS DIFERENTES
    const dias = [
      this.getFutureDate(1),
      this.getFutureDate(2),
      this.getFutureDate(3),
      this.getFutureDate(4)
    ];

    // 🔥 MAPA DE HORAS POR DÍA
    const horasPorDia: any = {};

    dias.forEach(dia => {
      horasPorDia[dia] = [...horasBase]; // copia de horas
    });

    // 🔥 GENERAR RESERVAS
    for (let i = 0; i < 10; i++) {

      const nombre = this.random(nombres);
      const apellido = this.random(apellidos);
      const dominio = this.random(dominios);

      const email = this.generarEmail(nombre, apellido, dominio);
      const phone = '3' + Math.floor(100000000 + Math.random() * 900000000);

      // 🔥 elegir día aleatorio
      const date = this.random(dias);

      // 🔴 SI YA NO HAY HORAS EN ESE DÍA → saltar
      if (horasPorDia[date].length === 0) continue;

      // 🔥 sacar hora única del día
      const index = this.randomNumber(0, horasPorDia[date].length - 1);
      const time = horasPorDia[date].splice(index, 1)[0];

      reservas.push({
        customerName: `${nombre} ${apellido}`,
        date,
        time,
        people: this.randomNumber(2, 6),
        phone,
        email
      });
    }

    return reservas;
  }

  // 🔥 EMAIL REALISTA
  private generarEmail(nombre: string, apellido: string, dominio: string): string {

    const formatos = [
      `${nombre}.${apellido}`,
      `${nombre}${apellido}`,
      `${nombre}_${apellido}`,
      `${nombre}${this.randomNumber(10, 99)}`,
      `${nombre}.${apellido}${this.randomNumber(10, 99)}`
    ];

    return `${this.random(formatos).toLowerCase()}@${dominio}`;
  }

  // 🔥 FECHA FUTURA
  private getFutureDate(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);

    return date.toISOString().split('T')[0];
  }

  // 🔥 RANDOM
  private random(arr: string[]): string {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  private randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}