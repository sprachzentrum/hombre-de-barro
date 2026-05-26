import type { Core } from '@strapi/strapi';

const PUBLIC_READ_TYPES = [
  'api::proyecto.proyecto',
  'api::articulo.articulo',
  'api::entrada-blog.entrada-blog',
  'api::tecnica.tecnica',
  'api::categoria-biblioteca.categoria-biblioteca',
  'api::categoria-blog.categoria-blog',
  'api::miembro-equipo.miembro-equipo',
  'api::pagina-inicio.pagina-inicio',
  'api::pagina-nosotros.pagina-nosotros',
  'api::configuracion-global.configuracion-global',
  'api::comparador-parametros.comparador-parametros',
];

const PUBLIC_CREATE_TYPES = [
  'api::consulta.consulta',
];

async function setPublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });
  if (!publicRole) return;

  const desired: Array<{ action: string }> = [];
  for (const uid of PUBLIC_READ_TYPES) {
    desired.push({ action: `${uid}.find` });
    desired.push({ action: `${uid}.findOne` });
  }
  for (const uid of PUBLIC_CREATE_TYPES) {
    desired.push({ action: `${uid}.create` });
  }

  for (const perm of desired) {
    const existing = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action: perm.action, role: publicRole.id } });
    if (!existing) {
      await strapi.db
        .query('plugin::users-permissions.permission')
        .create({ data: { action: perm.action, role: publicRole.id } });
    }
  }
  strapi.log.info('[bootstrap] Public read permissions configured.');
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      await setPublicPermissions(strapi);
    } catch (e) {
      strapi.log.warn(`[bootstrap] Could not set permissions: ${(e as Error).message}`);
    }
  },
};
