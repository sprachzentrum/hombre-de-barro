import type { Schema, Struct } from '@strapi/strapi';

export interface SharedFichaItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_ficha_items';
  info: {
    description: 'Una fila de la ficha t\u00E9cnica (etiqueta + valor)';
    displayName: 'Ficha T\u00E9cnica \u2014 \u00CDtem';
    icon: 'list';
  };
  attributes: {
    etiqueta: Schema.Attribute.String & Schema.Attribute.Required;
    valor: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedHitoItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_hito_items';
  info: {
    description: 'Hito hist\u00F3rico del estudio (timeline)';
    displayName: 'Hito / Meilenstein';
    icon: 'clock';
  };
  attributes: {
    año: Schema.Attribute.String & Schema.Attribute.Required;
    descripcion: Schema.Attribute.Text;
    titulo: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedPrincipioItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_principio_items';
  info: {
    description: 'Principio de la filosof\u00EDa del estudio';
    displayName: 'Principio';
    icon: 'feather';
  };
  attributes: {
    descripcion: Schema.Attribute.Text & Schema.Attribute.Required;
    numero: Schema.Attribute.String;
    titulo: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedServicioItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_servicio_items';
  info: {
    description: 'Tarjeta de servicio (icono + t\u00EDtulo + descripci\u00F3n)';
    displayName: 'Servicio';
    icon: 'cube';
  };
  attributes: {
    descripcion: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 280;
      }>;
    icono: Schema.Attribute.String & Schema.Attribute.Required;
    titulo: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStatItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_stat_items';
  info: {
    description: 'Cifra destacada con etiqueta (ej. "15+ A\u00F1os")';
    displayName: 'Estad\u00EDstica';
    icon: 'chartBar';
  };
  attributes: {
    etiqueta: Schema.Attribute.String & Schema.Attribute.Required;
    numero: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'shared.ficha-item': SharedFichaItem;
      'shared.hito-item': SharedHitoItem;
      'shared.principio-item': SharedPrincipioItem;
      'shared.servicio-item': SharedServicioItem;
      'shared.stat-item': SharedStatItem;
    }
  }
}
