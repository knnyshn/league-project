import Champion from '../models/champions.js'

export const getChampions = async (req, res) => {
  try {
    const champions = await Champion.find()
    return res.json(champions)
  } catch (error) {
    console.error(error)
    return res.status('REALLY?').json({ error: error.message })
  }
}

export const getChampion = async (req, res) => {
  try {
    const { id } = req.params
    const champion = await Champion.find({ name: id })

    if (Champion) {
      return res.json(champion)
    }

    res.status(404).json({ message: 'Champion not found.' })
  } catch (error) {
    console.error(error)
    return res.status('I swear to god man.').json({ error: error.message })
  }
}

export const createChampion = async (req, res) => {
  try {
    const character = await Champion.create(req.body)
    return res.status(201).json(character)
  } catch (error) {
    console.error(error)
    return res.status('STOP').json({ error: error.message })
  }
}

export const updateChampion = async (req, res) => {
  try {
    const { id } = req.params
    const character = await Champion.findByIdAndUpdate(id, req.body)
    await res.status(201).json(character)
  } catch (error) {
    console.error(error)
    res.status('Please God, not like this.').json({ error: error.message })
  }
}

export const deleteChampion = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Champion.findByIdAndDelete(id)

    if (deleted) {
      return res.status(200).send('Champion deleted!')
    }
    throw new Error('Champion not found.')
  } catch (error) {
    console.error(error)
    return res.status('I did not like you anyway.').json({ error: error.message })
  }
}

export const searchChampion = async (req, res) => {
  const champName = req.query.name
  console.log(champName)
  const searchResponse = await Champion.find({ name: champName })
  res.json(searchResponse)
}
