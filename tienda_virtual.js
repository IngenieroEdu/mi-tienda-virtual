// js/tienda_virtual.js

// --- Clase Base: Producto ---
class Producto {
    // Propiedades privadas: usamos '#' para hacerlas realmente privadas (ES2019+)
    #id;
    #nombre;
    #precio;
    #categoria;

    //esta es la forma de definir un constructor en una clase
    //recuerda que el constructor es un método especial que se ejecuta al --
    // -- crear una instancia de la clase
    //el constructor recibe parámetros que se asignan a las propiedades de la clase
    constructor(id, nombre, precio, categoria) {
        this.#id = id;
        this.#nombre = nombre;
        this.#precio = precio;
        this.#categoria = categoria;
    }

    // Métodos Getter para acceder a las propiedades privadas
    getId() { return this.#id; }
    getNombre() { return this.#nombre; }
    getPrecio() { return this.#precio; }
    getCategoria() { return this.#categoria; }

    // Método público para calcular el impuesto base
    calcularImpuesto() {
        return this.#precio * 0.10; // 10% de impuesto base
    }

    // --- Aplicación de Polimorfismo ---
    // Este método se define en la clase base y será sobrescrito/implementado
    // de manera específica en cada clase derivada para mostrar su información.
    mostrarInformacion() {
        const impuesto = this.calcularImpuesto();
        const precioConImpuesto = this.#precio + impuesto;
        return `
            <h2>${this.#nombre}</h2>
            <p>ID: ${this.#id}</p>
            <p>Precio: $${this.#precio.toFixed(2)}</p>
            <p class="categoria">Categoría: ${this.#categoria}</p>
            <p class="impuesto">Impuesto (10%): $${impuesto.toFixed(2)}</p>
            <p>Precio Final: $${precioConImpuesto.toFixed(2)}</p>
        `;
    }
}

// --- Clases Derivadas ---

// 1. Clase Electrónicos
class Electronico extends Producto {
    #marca;
    #modelo;

    constructor(id, nombre, precio, marca, modelo) {
        super(id, nombre, precio, "Electrónicos"); // Llama al constructor de Producto
        this.#marca = marca;
        this.#modelo = modelo;
    }

    getMarca() { return this.#marca; }
    getModelo() { return this.#modelo; }

    // Sobrescritura de método: Impuesto específico para electrónicos (ej. 15%)
    calcularImpuesto() {
        return this.getPrecio() * 0.15; // 15% de impuesto para electrónicos
    }

    // --- Aplicación de Polimorfismo ---
    //recuerda que el polimorfismo permite que las clases derivadas
    //sobrescriban métodos de la clase base para proporcionar una implementación específica.
    //conceptualmente el polimorfismo es la capacidad de un objeto de tomar muchas formas.
    // En este caso, sobrescribimos el método mostrarInformacion para incluir detalles específicos de
    // Sobrescribimos el método para incluir información específica de Electrónico
    mostrarInformacion() {
        const infoBase = super.mostrarInformacion(); // Obtenemos la información base
        return `
            ${infoBase}
            <p>Marca: ${this.#marca}</p>
            <p>Modelo: ${this.#modelo}</p>
        `;
    }
}

// 2. Clase Ropa
class Ropa extends Producto {
    #talla;
    #material;

    constructor(id, nombre, precio, talla, material) {
        super(id, nombre, precio, "Ropa");
        this.#talla = talla;
        this.#material = material;
    }

    getTalla() { return this.#talla; }
    getMaterial() { return this.#material; }

    // Sobrescritura de método: Impuesto específico para ropa (ej. 8%)
    calcularImpuesto() {
        return this.getPrecio() * 0.08; // 8% de impuesto para ropa
    }

    // --- Aplicación de Polimorfismo ---
    // Sobrescribimos el método para incluir información específica de Ropa
    mostrarInformacion() {
        const infoBase = super.mostrarInformacion();
        return `
            ${infoBase}
            <p>Talla: ${this.#talla}</p>
            <p>Material: ${this.#material}</p>
        `;
    }
}

// 3. Clase Alimentos
class Alimento extends Producto {
    #fechaCaducidad;
    #esOrganico;

    constructor(id, nombre, precio, fechaCaducidad, esOrganico) {
        super(id, nombre, precio, "Alimentos");
        this.#fechaCaducidad = fechaCaducidad;
        this.#esOrganico = esOrganico;
    }

    getFechaCaducidad() { return this.#fechaCaducidad; }
    getEsOrganico() { return this.#esOrganico; }

    // Sobrescritura de método: Impuesto específico para alimentos (ej. 5% si no es orgánico, 0% si es orgánico)
    calcularImpuesto() {
        if (this.#esOrganico) {
            return 0; // Alimentos orgánicos no tienen impuesto en este ejemplo
        }
        return this.getPrecio() * 0.05; // 5% para alimentos no orgánicos
    }

    // --- Aplicación de Polimorfismo ---
    // Sobrescribimos el método para incluir información específica de Alimento
    mostrarInformacion() {
        const infoBase = super.mostrarInformacion();
        return `
            ${infoBase}
            <p>Fecha de Caducidad: ${this.#fechaCaducidad}</p>
            <p>Orgánico: ${this.#esOrganico ? 'Sí' : 'No'}</p>
        `;
    }
}


// --- Lógica para mostrar los productos en el HTML ---

// Crear instancias de los productos
const productosTienda = [
    new Electronico(101, "Smartphone X", 800, "TechBrand", "X-Pro"),
    new Ropa(201, "Camiseta Algodón", 25, "M", "Algodón"),
    new Alimento(301, "Manzanas Orgánicas", 3.50, "2025-07-25", true),
    new Electronico(102, "Auriculares Bluetooth", 99.99, "AudioPro", "HP-200"),
    new Ropa(202, "Jeans Slim Fit", 59.99, "L", "Mezclilla"),
    new Alimento(302, "Pan Integral", 4.20, "2025-07-20", false)
];

// Obtener el contenedor en el HTML
const productosContainer = document.getElementById('productos-container');

// Iterar sobre los productos y mostrar su información
productosTienda.forEach(producto => {
    const productCard = document.createElement('div');
    productCard.classList.add('producto-card');
    // Aquí se invoca el método `mostrarInformacion()`
    // Gracias al polimorfismo, cada objeto (Electrónica, Ropa, Alimentos)
    // llamará a su propia versión del método, mostrando la información
    // específica de su tipo, pero desde una llamada común.
    productCard.innerHTML = producto.mostrarInformacion();
    productosContainer.appendChild(productCard);
});
