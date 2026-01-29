import { sequelize } from './src/db/sequelize.mjs';
import { Event } from './src/models/event_model.mjs';

console.log('🧪 Test simple de création d\'événement\n');

async function simpleTest() {
    try {
        // Test de connexion
        await sequelize.authenticate();
        console.log('✅ Connexion OK\n');

        // Test: Créer un événement
        console.log('➕ Création d\'un événement...');
        const event = await Event.create({
            event_name: 'Test Simple ' + Date.now(),
            event_date: '2026-02-15',
            user_id: null
        });
        console.log('✅ Événement créé avec ID:', event.id);
        console.log('   Données:', event.toJSON());
        console.log('');

        // Test: Lire tous les événements
        console.log('📖 Lecture de tous les événements:');
        const allEvents = await Event.findAll();
        console.log(`   Trouvé ${allEvents.length} événement(s)`);
        allEvents.forEach(e => {
            console.log(`   - [${e.id}] ${e.event_name} (${e.event_date})`);
        });
        console.log('');

        // Test: Mettre à jour l'événement
        console.log('✏️  Mise à jour de l\'événement...');
        await event.update({ event_name: 'Test Modifié ' + event.id });
        console.log('✅ Événement mis à jour:', event.event_name);
        console.log('');

        // Test: Supprimer l'événement
        console.log('🗑️  Suppression de l\'événement...');
        await event.destroy();
        console.log('✅ Événement supprimé');
        console.log('');

        console.log('🎉 TOUS LES TESTS ONT RÉUSSI !');
        console.log('');
        console.log('👉 La base de données fonctionne correctement.');
        console.log('   Les modifications sont bien persistées.');

    } catch (error) {
        console.error('❌ ERREUR:', error.name);
        console.error('   Message:', error.message);
        if (error.original) {
            console.error('   SQL Error:', error.original.sqlMessage);
        }
    } finally {
        await sequelize.close();
    }
}

simpleTest();
