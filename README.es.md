# 🛍️ ISA Making Mobile

[Versión en inglés](README.md)

ISA Making es un sistema de información diseñado para gestionar todo el flujo de trabajo de comercio electrónico: desde la selección y personalización de productos, hasta el pago y seguimiento de entregas. Permite a los usuarios agregar productos al carrito, completar pagos seguros y monitorear el estado de los envíos a través de servicios como Interrapidísimo. Los administradores tienen control total sobre la gestión de productos y actualización de inventario.

![Isa Making Mobile](./docs/screenshots/isa-making-mobile.png)

---

## 📑 Tabla de Contenidos

1. [Características Principales](#-características-principales)  
2. [Tecnologías Utilizadas](#-tecnologías-utilizadas)  
3. [Arquitectura del Sistema](#%EF%B8%8F-arquitectura-del-sistema)  
4. [Flujos del Sistema](#-flujos-del-sistema)  
5. [Instalación](#%EF%B8%8F-instalación)  
6. [Contacto](#-contacto)

---

## ✨ Características Principales

El sistema ofrece las siguientes funcionalidades principales:

---

### 🧥 Autenticación de Usuarios

Autenticación segura y fluida para proteger los datos del usuario y personalizar su experiencia de compra.

![Captura de Autenticación de Usuario](./docs/screenshots/user-authentication.png)

---

### 👤 Gestión de Perfil

Los usuarios pueden gestionar fácilmente su perfil, actualizar información personal y revisar el historial de pedidos.

![Captura de Gestión de Perfil](./docs/screenshots/profile-management.png)

---

### 📦 Ver Detalles del Pedido

Seguimiento detallado del historial de pedidos, permitiendo a los usuarios monitorear el estado de sus compras desde la solicitud hasta la entrega.

![Captura de Detalles del Pedido](./docs/screenshots/order-details.png)

---

### 🛒 Carrito de Compras

Funcionalidad intuitiva y fácil de usar para agregar, quitar y gestionar productos antes de finalizar la compra.

![Captura del Carrito de Compras](./docs/screenshots/product-cart.png)

---

## 💻 Tecnologías Utilizadas

### **Frontend**

- **Expo V52**
- **NativeWind V4**
- **TailwindCSS V3.14**
- **Valibot**

### **Backend (Proyecto NextJS)**

- **Next.js API (App Router)**
- **Sequelize CLI + MySQL**
- **Pasarela de pago PayU**

---

## 🏗️ Arquitectura del Sistema

ISA Making sigue una arquitectura **cliente-servidor**, con una clara separación entre las capas frontend y backend. La comunicación se realiza a través de solicitudes HTTP y endpoints API, lo que garantiza escalabilidad, mantenibilidad y una experiencia dinámica para el usuario.

> **Frontend:** Proporciona una interfaz interactiva y adaptable  
> **Backend:** Gestiona la lógica de negocio, autenticación, pagos y operaciones con la base de datos

![Diagrama de Arquitectura](./docs/architecture.png)

---

## 🔄 Flujos del Sistema

Esta sección describe los principales flujos del sistema ISA Making Mobile:

- **Navegación de Productos:** Los usuarios pueden explorar productos, filtrarlos por categorías y ver información detallada.
- **Agregar al Carrito:** Se pueden añadir productos al carrito y ajustar sus cantidades.
- **Proceso de Compra:** Un flujo de compra seguro y fluido, incluyendo selección de dirección y métodos de pago.
- **Confirmación de Pedido:** Envío del pedido y recepción de confirmación.
- **Seguimiento de Pedido:** Monitoreo del estado de pedidos realizados.
- **Gestión de Productos (Admin):** Los administradores pueden agregar, editar y eliminar productos.
- **Gestión de Inventario:** Los administradores pueden actualizar el stock disponible.

---

## 🛠️ Instalación

Sigue estos pasos para ejecutar ISA Making de forma local:

### **Requisitos Previos**

- Node.js >= 18  
- Tener corriendo el [PROYECTO NEXT](https://github.com/AndresGutierrezHurtado/isa-making)

### **Pasos**

1. **Clonar el repositorio**

    ```bash
    git clone https://github.com/AndresGutierrezHurtado/isa-making-mobile.git
    cd isa-making-mobile
    ```

2. **Instalar dependencias**

    ```bash
    npm install
    ```

3. **Configurar variables de entorno**

    Copia el archivo `.env.example` para crear uno nuevo `.env`:

    ```bash
    cp .env.example .env
    ```

    Luego, agrega tu configuración personalizada en el archivo `.env`.

4. **Iniciar el servidor de desarrollo**

    ```bash
    npx expo start -c
    ```

---

## 📬 Contacto

Para dudas, soporte o colaboración, por favor contacta a:

- **Andrés Gutiérrez Hurtado**  
- Correo: [andres52885241@gmail.com](mailto:andres52885241@gmail.com)  
- GitHub: [@AndresGutierrezHurtado](https://github.com/AndresGutierrezHurtado)  
- LinkedIn: [Andrés Gutiérrez](https://www.linkedin.com/in/andr%C3%A9s-guti%C3%A9rrez-hurtado-25946728b/)
